const router = require("express").Router()
const { protect } = require("../middleware/auth.middleware")
const Review = require("../models/Review")
const Service = require("../models/Service")
const User = require("../models/User")

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

    // 🔥 Calculate new average rating
    const reviews = await Review.find({ service: serviceId })

    const avg =
      reviews.reduce((acc, r) => acc + r.rating, 0) /
      reviews.length

    // 🔥 Update service average rating
    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      { averageRating: avg },
      { new: true }
    )

    // 🔥 AUTO BLOCK PROVIDER IF AVG < 2
    if (avg < 2) {
      await User.findByIdAndUpdate(updatedService.provider, {
        isBlocked: true
      })
    }

    res.json(review)

  } catch (err) {
    console.error("Review creation failed:", err)
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
