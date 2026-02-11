// admin.routes.js
// router.get("/users", protect, authorize("ADMIN"), async (req, res) => {
//   const users = await prisma.user.findMany()
//   res.json(users)
// })


const router = require("express").Router()
const { protect, authorize } = require("../middleware/auth.middleware")
const prisma = require("../prisma/client")

router.get(
  "/stats",
  protect,
  authorize("ADMIN"),
  async (req, res) => {
    const users = await prisma.user.count()
    const services = await prisma.service.count()
    const bookings = await prisma.booking.count()

    const revenue = await prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: "SUCCESS" },
    })

    res.json({
      users,
      services,
      bookings,
      revenue: revenue._sum.amount || 0,
    })
  }
)

// admin.routes.js
// router.get("/users", protect, authorize("ADMIN"), async (req, res) => {
//   const users = await prisma.user.findMany()
//   res.json(users)
// })


module.exports = router
