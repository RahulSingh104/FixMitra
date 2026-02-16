// const router = require("express").Router();
// const { protect, authorize } = require("../middleware/auth.middleware");
// const prisma = require("../prisma/client");

// // Create Category (Admin only)
// router.post(
//   "/category",
//   protect,
//   authorize("ADMIN"),
//   async (req, res) => {
//     const { name } = req.body;

//     const category = await prisma.category.create({
//       data: { name },
//     });

//     res.json(category);
//   }
// );

// // Get All Categories
// router.get("/category", async (req, res) => {
//   const categories = await prisma.category.findMany();
//   res.json(categories);
// });



// // Create Service (Provider only)
// router.post(
//   "/",
//   protect,
//   authorize("PROVIDER"),
//   async (req, res) => {
//     try {
//       const { title, description, price, location, categoryId, image } = req.body;

//       const service = await prisma.service.create({
//         data: {
//           title,
//           description,
//           price: parseFloat(price),
//           location,
//           categoryId,   // remove Number if String
//           providerId: req.user.id,
//           image,
//         },
//       });

//       res.json(service);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Service creation failed" });
//     }
//   }
// );




// // Get All Services (Public)
// router.get("/", async (req, res) => {
//   const services = await prisma.service.findMany({
//     include: {
//       category: true,
//       provider: {
//         select: { name: true, email: true },
//       },
//     },
//   });

//   res.json(services);
// });

// // Get Provider's Services
// router.get(
//   "/provider",
//   protect,
//   authorize("PROVIDER"),
//   async (req, res) => {
//     const services = await prisma.service.findMany({
//       where: { providerId: req.user.id },
//     })
//     res.json(services)
//   }
// )

// // Get single service
// router.get("/:id", async (req, res) => {
//   const service = await prisma.service.findUnique({
//     where: { id: req.params.id },
//     include: {
//       category: true,
//       provider: {
//         select: { name: true, email: true },
//       },
//       reviews: true,
//     },
//   });

//   res.json(service);
// });




// module.exports = router;


const router = require("express").Router()
const { protect, authorize } = require("../middleware/auth.middleware")
const Service = require("../models/Service")
const Category = require("../models/Category")

// Create Category (Admin)
router.post("/category", protect, authorize("ADMIN"), async (req, res) => {
  try {
    const category = await Category.create({ name: req.body.name })
    res.json(category)
  } catch (err) {
    res.status(500).json({ message: "Category creation failed" })
  }
})

// Get Categories
router.get("/category", async (req, res) => {
  const categories = await Category.find()
  res.json(categories)
})

// Create Service (Provider)
router.post("/", protect, authorize("PROVIDER"), async (req, res) => {
  try {
    const service = await Service.create({
      title: req.body.title,
      description: req.body.description,
      price: Number(req.body.price),
      location: req.body.location,
      image: req.body.image,
      provider: req.user._id,
      category: req.body.categoryId
    })

    res.json(service)
  } catch (err) {
    res.status(500).json({ message: "Service creation failed" })
  }
})

// Get All Services
router.get("/", async (req, res) => {
  const services = await Service.find()
    .populate("category")
    .populate("provider", "name email")

  res.json(services)
})

// Get Single Service
router.get("/:id", async (req, res) => {
  const service = await Service.findById(req.params.id)
    .populate("category")
    .populate("provider", "name email")

  res.json(service)
})

module.exports = router

