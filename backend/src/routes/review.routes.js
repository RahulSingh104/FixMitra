const router = require("express").Router();
const prisma = require("../prisma/client");
const { protect } = require("../middleware/auth.middleware");

// Create Review (USER)
router.post("/", protect, async (req, res) => {
  const { serviceId, rating, comment } = req.body;

  const review = await prisma.review.create({
    data: {
      userId: req.user.id,
      serviceId,
      rating,
      comment,
    },
  });

  res.json(review);
});

// Get Reviews for Service
router.get("/:serviceId", async (req, res) => {
  const reviews = await prisma.review.findMany({
    where: { serviceId: req.params.serviceId },
    include: {
      user: {
        select: { name: true },
      },
    },
  });

  res.json(reviews);
});

module.exports = router;
