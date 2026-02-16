const mongoose = require("mongoose")

const emailOtpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  expiresAt: Date
})

module.exports = mongoose.model("EmailOTP", emailOtpSchema)
