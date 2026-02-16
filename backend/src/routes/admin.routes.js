// // admin.routes.js
// // router.get("/users", protect, authorize("ADMIN"), async (req, res) => {
// //   const users = await prisma.user.findMany()
// //   res.json(users)
// // })


// const router = require("express").Router()
// const { protect, authorize } = require("../middleware/auth.middleware")
// const prisma = require("../prisma/client")

// router.get(
//   "/stats",
//   protect,
//   authorize("ADMIN"),
//   async (req, res) => {
//     const users = await prisma.user.count()
//     const services = await prisma.service.count()
//     const bookings = await prisma.booking.count()

//     const revenue = await prisma.payment.aggregate({
//       _sum: { amount: true },
//       where: { status: "SUCCESS" },
//     })

//     res.json({
//       users,
//       services,
//       bookings,
//       revenue: revenue._sum.amount || 0,
//     })
//   }
// )

// // admin.routes.js
// // router.get("/users", protect, authorize("ADMIN"), async (req, res) => {
// //   const users = await prisma.user.findMany()
// //   res.json(users)
// // })


// module.exports = router



const router = require("express").Router()
const { protect, authorize } = require("../middleware/auth.middleware")
const User = require("../models/User")
const Service = require("../models/Service")
const Booking = require("../models/Booking")
const Payment = require("../models/Payment")

router.get("/stats", protect, authorize("ADMIN"), async (req, res) => {
  const users = await User.countDocuments()
  const services = await Service.countDocuments()
  const bookings = await Booking.countDocuments()

  const payments = await Payment.find({ status: "SUCCESS" })
  const revenue = payments.reduce((sum, p) => sum + p.amount, 0)

  res.json({
    users,
    services,
    bookings,
    revenue
  })
})

module.exports = router
