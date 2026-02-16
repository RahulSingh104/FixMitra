// const router = require("express").Router();
// const prisma = require("../prisma/client");
// const { protect, authorize } = require("../middleware/auth.middleware");

// /*
// ----------------------------------
// CREATE BOOKING (USER)
// ----------------------------------
// */

// router.post("/", protect, async (req, res) => {
//   const { serviceId, address, scheduledAt } = req.body;

//   const booking = await prisma.booking.create({
//     data: {
//       userId: req.user.id,
//       serviceId,
//       address,
//       scheduledAt: new Date(scheduledAt),
//     },
//   });

//   res.json(booking);
// });

// /*
// ----------------------------------
// PROVIDER ACCEPT / REJECT BOOKING
// ----------------------------------
// */

// router.patch(
//   "/:id/status",
//   protect,
//   authorize("PROVIDER"),
//   async (req, res) => {
//     const { status } = req.body;

//     const booking = await prisma.booking.update({
//       where: { id: req.params.id },
//       data: { status },
//     });

//     res.json(booking);
//   }
// );

// /*
// ----------------------------------
// USER BOOKINGS
// ----------------------------------
// */

// router.get("/my", protect, async (req, res) => {
//   const bookings = await prisma.booking.findMany({
//     where: { userId: req.user.id },
//     include: {
//       service: true,
//       payment: true,
//     },
//   });

//   res.json(bookings);
// });


// // PROVIDER BOOKINGS
// router.get(
//   "/provider",
//   protect,
//   authorize("PROVIDER"),
//   async (req, res) => {
//     const bookings = await prisma.booking.findMany({
//       where: {
//         service: {
//           providerId: req.user.id,
//         },
//       },
//       include: {
//         user: true,
//         service: true,
//       },
//     })

//     res.json(bookings)
//   }
// )

// // PROVIDER UPDATE BOOKING STATUS

// router.put(
//   "/:id/status",
//   protect,
//   authorize("PROVIDER"),
//   async (req, res) => {
//     const { status } = req.body

//     const booking = await prisma.booking.update({
//       where: { id: req.params.id },
//       data: { status },
//     })

//     res.json(booking)
//   }
// )
// // Provider Stats
// router.get(
//   "/provider/stats",
//   protect,
//   authorize("PROVIDER"),
//   async (req, res) => {
//     try {
//       const providerId = req.user.id

//       const services = await prisma.service.findMany({
//         where: { providerId },
//         include: {
//           bookings: true,
//         },
//       })

//       let totalBookings = 0
//       let completed = 0
//       let earnings = 0

//       services.forEach(service => {
//         totalBookings += service.bookings.length

//         service.bookings.forEach(b => {
//           if (b.status === "COMPLETED") {
//             completed++
//             earnings += service.price
//           }
//         })
//       })

//       res.json({
//         totalServices: services.length,
//         totalBookings,
//         completedBookings: completed,
//         earnings,
//       })

//     } catch (err) {
//       console.error(err)
//       res.status(500).json({ message: "Stats fetch failed" })
//     }
//   }
// )


// module.exports = router;


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
