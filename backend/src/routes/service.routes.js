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


router.post("/", protect, authorize("PROVIDER"), async (req, res) => {
  try {
    console.log("Incoming Data:", req.body)
    console.log("User:", req.user)

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
    console.error("CREATE SERVICE ERROR:", err)
    res.status(500).json({ message: err.message })
  }
})


// Get All Services
router.get("/", async (req, res) => {
  const services = await Service.find()
    .populate("category")
    .populate("provider", "name email")

  res.json(services)
})


// 🔥 Get Provider's Services (PUT ABOVE :id)
router.get("/provider", protect, authorize("PROVIDER"), async (req, res) => {
  const services = await Service.find({ provider: req.user._id })
    .populate("category")

  res.json(services)
})


// Get Single Service (ALWAYS KEEP THIS LAST)
router.get("/:id", async (req, res) => {
  const service = await Service.findById(req.params.id)
    .populate("category")
    .populate("provider", "name email")

  if (!service) {
    return res.status(404).json({ message: "Service not found" })
  }

  res.json(service)
})


// DELETE SERVICE (Provider Only)
router.delete("/:id", protect, authorize("PROVIDER"), async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)

    if (!service) {
      return res.status(404).json({ message: "Service not found" })
    }

    if (service.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this service" })
    }

    await service.deleteOne()

    res.json({ message: "Service deleted successfully" })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Service deletion failed" })
  }
})



module.exports = router

