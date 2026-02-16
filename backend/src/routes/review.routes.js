// const router = require("express").Router();
// const prisma = require("../prisma/client");
// const { protect } = require("../middleware/auth.middleware");

// // Create Review (USER)
// router.post("/", protect, async (req, res) => {
//   const { serviceId, rating, comment } = req.body;

//   const review = await prisma.review.create({
//     data: {
//       userId: req.user.id,
//       serviceId,
//       rating,
//       comment,
//     },
//   });

//   res.json(review);
// });

// // Get Reviews for Service
// router.get("/:serviceId", async (req, res) => {
//   const reviews = await prisma.review.findMany({
//     where: { serviceId: req.params.serviceId },
//     include: {
//       user: {
//         select: { name: true },
//       },
//     },
//   });

//   res.json(reviews);
// });

// module.exports = router;

const router = require("express").Router()
const { protect } = require("../middleware/auth.middleware")
const Review = require("../models/Review")
const Service = require("../models/Service")

// Create Review (USER)
router.post("/", protect, async (req, res) => {
  try {
    const { serviceId, rating, comment } = req.body

    const review = await Review.create({
      user: req.user._id,
      service: serviceId,
      rating,
      comment,
    })

    // 🔥 Update average rating
    const reviews = await Review.find({ service: serviceId })

    const avg =
      reviews.reduce((acc, r) => acc + r.rating, 0) /
      reviews.length

    await Service.findByIdAndUpdate(serviceId, {
      averageRating: avg,
    })

    res.json(review)

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Review creation failed" })
  }
})

// Get Reviews for Service
router.get("/:serviceId", async (req, res) => {
  try {
    const reviews = await Review.find({
      service: req.params.serviceId,
    }).populate("user", "name")

    res.json(reviews)
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" })
  }
})

module.exports = router
