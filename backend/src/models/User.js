const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["USER", "PROVIDER", "ADMIN"],
    default: "USER"
  },
  provider: { type: String, default: "EMAIL" },
  isVerified: { type: Boolean, default: true }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)
