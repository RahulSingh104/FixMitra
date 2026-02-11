const prisma = require("../prisma/client");

exports.createReview = async (req, res) => {
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
};
const reviews = await prisma.review.findMany({
  where: { serviceId },
});

const avg =
  reviews.reduce((acc, r) => acc + r.rating, 0) /
  reviews.length;

await prisma.service.update({
  where: { id: serviceId },
  data: { averageRating: avg },
});
