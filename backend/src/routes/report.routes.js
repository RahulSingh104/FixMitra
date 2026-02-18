const router = require("express").Router()
const { protect, authorize } = require("../middleware/auth.middleware")
const Report = require("../models/Report")

router.post("/", protect, async (req, res) => {
  const report = await Report.create({
    reporter: req.user._id,
    provider: req.body.providerId,
    reason: req.body.reason
  })

  res.json(report)
})

router.get("/", protect, authorize("ADMIN"), async (req, res) => {
  const reports = await Report.find()
    .populate("reporter provider", "name email")

  res.json(reports)
})

module.exports = router
