const router = require("express").Router()
const crypto = require("crypto")
const razorpay = require("../config/razorpay")
const { protect } = require("../middleware/auth.middleware")

const Booking = require("../models/Booking")
const Payment = require("../models/Payment")

/*
----------------------------------
CREATE RAZORPAY ORDER
----------------------------------
*/

router.post("/create-order", protect, async (req, res) => {
  try {
    const { bookingId } = req.body

    const booking = await Booking.findById(bookingId)
      .populate("service")

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }

    const options = {
      amount: booking.service.price * 100,
      currency: "INR",
      receipt: bookingId.toString(),
    }

    const order = await razorpay.orders.create(options)

    // Save payment record
    await Payment.create({
      booking: bookingId,
      amount: booking.service.price,
      status: "PENDING"
    })

    res.json(order)

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Order creation failed" })
  }
})

/*
----------------------------------
VERIFY PAYMENT
----------------------------------
*/

router.post("/verify", protect, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body

    const body =
      razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex")

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" })
    }

    // Update payment
    await Payment.findOneAndUpdate(
      { booking: razorpay_order_id },
      { status: "SUCCESS" }
    )

    // Update booking
    await Booking.findByIdAndUpdate(
      razorpay_order_id,
      { status: "ACCEPTED" }
    )

    res.json({ message: "Payment verified successfully" })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Payment verification failed" })
  }
})

module.exports = router
