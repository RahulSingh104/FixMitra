const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true, // Make category optional
    },
    totalBookings: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Service", serviceSchema)
