const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    location: String,
    image: String,
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Service", serviceSchema)
