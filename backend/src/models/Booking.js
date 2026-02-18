const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  address: String,
  scheduledAt: Date,
  status: {
    type: String,
    enum: ["PENDING", "ACCEPTED", "COMPLETED", "REJECTED","CANCELLED"],
    default: "PENDING"
  }
}, { timestamps: true })

module.exports = mongoose.model("Booking", bookingSchema)
