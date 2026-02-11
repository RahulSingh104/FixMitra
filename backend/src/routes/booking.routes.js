// const router = require("express").Router();
// const { protect } = require("../middleware/auth.middleware");
// const bookingController = require("../controllers/booking.controller");

// router.post("/", protect, bookingController.createBooking);
// router.patch("/:id/status", protect, bookingController.updateBookingStatus);

// module.exports = router;


const router = require("express").Router();
const prisma = require("../prisma/client");
const { protect, authorize } = require("../middleware/auth.middleware");

/*
----------------------------------
CREATE BOOKING (USER)
----------------------------------
*/

router.post("/", protect, async (req, res) => {
  const { serviceId, address, scheduledAt } = req.body;

  const booking = await prisma.booking.create({
    data: {
      userId: req.user.id,
      serviceId,
      address,
      scheduledAt: new Date(scheduledAt),
    },
  });

  res.json(booking);
});

/*
----------------------------------
PROVIDER ACCEPT / REJECT BOOKING
----------------------------------
*/

router.patch(
  "/:id/status",
  protect,
  authorize("PROVIDER"),
  async (req, res) => {
    const { status } = req.body;

    const booking = await prisma.booking.update({
      where: { id: req.params.id },
      data: { status },
    });

    res.json(booking);
  }
);

/*
----------------------------------
USER BOOKINGS
----------------------------------
*/

router.get("/my", protect, async (req, res) => {
  const bookings = await prisma.booking.findMany({
    where: { userId: req.user.id },
    include: {
      service: true,
      payment: true,
    },
  });

  res.json(bookings);
});


// PROVIDER BOOKINGS
router.get(
  "/provider",
  protect,
  authorize("PROVIDER"),
  async (req, res) => {
    const bookings = await prisma.booking.findMany({
      where: {
        service: {
          providerId: req.user.id,
        },
      },
      include: {
        user: true,
        service: true,
      },
    })

    res.json(bookings)
  }
)

// PROVIDER UPDATE BOOKING STATUS

router.put(
  "/:id/status",
  protect,
  authorize("PROVIDER"),
  async (req, res) => {
    const { status } = req.body

    const booking = await prisma.booking.update({
      where: { id: req.params.id },
      data: { status },
    })

    res.json(booking)
  }
)


module.exports = router;
