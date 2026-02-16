const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  rating: Number,
  comment: String
}, { timestamps: true })

module.exports = mongoose.model("Review", reviewSchema)
