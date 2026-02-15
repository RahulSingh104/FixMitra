const router = require("express").Router();
const { protect, authorize } = require("../middleware/auth.middleware");
const prisma = require("../prisma/client");

// Create Category (Admin only)
router.post(
  "/category",
  protect,
  authorize("ADMIN"),
  async (req, res) => {
    const { name } = req.body;

    const category = await prisma.category.create({
      data: { name },
    });

    res.json(category);
  }
);

// Get All Categories
router.get("/category", async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});



// Create Service (Provider only)
router.post(
  "/",
  protect,
  authorize("PROVIDER"),
  async (req, res) => {
    try {
      const { title, description, price, location, categoryId, image } = req.body;

      const service = await prisma.service.create({
        data: {
          title,
          description,
          price: parseFloat(price),
          location,
          categoryId,   // remove Number if String
          providerId: req.user.id,
          image,
        },
      });

      res.json(service);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Service creation failed" });
    }
  }
);




// Get All Services (Public)
router.get("/", async (req, res) => {
  const services = await prisma.service.findMany({
    include: {
      category: true,
      provider: {
        select: { name: true, email: true },
      },
    },
  });

  res.json(services);
});

// Get Provider's Services
router.get(
  "/provider",
  protect,
  authorize("PROVIDER"),
  async (req, res) => {
    const services = await prisma.service.findMany({
      where: { providerId: req.user.id },
    })
    res.json(services)
  }
)

// Get single service
router.get("/:id", async (req, res) => {
  const service = await prisma.service.findUnique({
    where: { id: req.params.id },
    include: {
      category: true,
      provider: {
        select: { name: true, email: true },
      },
      reviews: true,
    },
  });

  res.json(service);
});




module.exports = router;
