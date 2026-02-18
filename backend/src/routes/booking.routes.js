const router = require("express").Router()
const Booking = require("../models/Booking")
const Service = require("../models/Service")
const { protect, authorize } = require("../middleware/auth.middleware")

router.post("/", protect, async (req, res) => {
  const booking = await Booking.create({
    user: req.user._id,
    service: req.body.serviceId,
    address: req.body.address,
    scheduledAt: new Date(req.body.scheduledAt)
  })

   // 🔥 INCREMENT totalBookings
    await Service.findByIdAndUpdate(req.body.serviceId, {
      $inc: { totalBookings: 1 }
    })

  res.json(booking)
})

router.patch("/:id/status", protect, authorize("PROVIDER"), async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  )

  res.json(booking)
})

router.get("/my", protect, async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("service")
  res.json(bookings)
})

router.get("/provider", protect, authorize("PROVIDER"), async (req, res) => {
  const services = await Service.find({ provider: req.user._id })
  const serviceIds = services.map(s => s._id)

  const bookings = await Booking.find({
    service: { $in: serviceIds }
  }).populate("user service")

  res.json(bookings)
})

module.exports = router
