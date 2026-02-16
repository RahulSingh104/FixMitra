// const router = require("express").Router();
// const prisma = require("../prisma/client");
// const { protect } = require("../middleware/auth.middleware");

// // Create Payment Entry
// router.post("/", protect, async (req, res) => {
//   const { bookingId, amount } = req.body;

//   const payment = await prisma.payment.create({
//     data: {
//       bookingId,
//       amount,
//     },
//   });

//   res.json(payment);
// });

// // Mark Payment Success
// router.patch("/:id/success", protect, async (req, res) => {
//   const payment = await prisma.payment.update({
//     where: { id: req.params.id },
//     data: { status: "SUCCESS" },
//   });

//   res.json(payment);
// });

// module.exports = router;


// const router = require("express").Router();
// const crypto = require("crypto");
// const prisma = require("../prisma/client");
// const razorpay = require("../config/razorpay");
// const { protect } = require("../middleware/auth.middleware");

// /*
// ----------------------------------
// CREATE RAZORPAY ORDER
// ----------------------------------
// */

// router.post("/create-order", protect, async (req, res) => {
//   const { bookingId } = req.body;

//   const booking = await prisma.booking.findUnique({
//     where: { id: bookingId },
//     include: { service: true },
//   });

//   if (!booking) {
//     return res.status(404).json({ message: "Booking not found" });
//   }

//   const options = {
//     amount: booking.service.price * 100, // Razorpay works in paisa
//     currency: "INR",
//     receipt: bookingId,
//   };

//   const order = await razorpay.orders.create(options);

//   await prisma.payment.create({
//     data: {
//       bookingId,
//       amount: booking.service.price,
//     },
//   });

//   res.json(order);
// });

// /*
// ----------------------------------
// VERIFY PAYMENT
// ----------------------------------
// */

// router.post("/verify", protect, async (req, res) => {
//   const {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//   } = req.body;

//   const body =
//     razorpay_order_id + "|" + razorpay_payment_id;

//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//     .update(body.toString())
//     .digest("hex");

//   if (expectedSignature !== razorpay_signature) {
//     return res.status(400).json({ message: "Invalid signature" });
//   }

//   const payment = await prisma.payment.updateMany({
//     where: {
//       bookingId: razorpay_order_id,
//     },
//     data: {
//       status: "SUCCESS",
//     },
//   });

//   await prisma.booking.update({
//     where: { id: razorpay_order_id },
//     data: { status: "ACCEPTED" },
//   });

//   res.json({ message: "Payment verified successfully" });
// });

// module.exports = router;



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
