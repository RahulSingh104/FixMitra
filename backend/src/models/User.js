const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["USER", "PROVIDER", "ADMIN"],
      default: "USER",
      index: true,
    },

    provider: {
      type: String,
      default: "EMAIL",
    },

    isVerified: {
      type: Boolean,
      default: true,
    },

    isBlocked: {
      type: Boolean,
      default: false,
      index: true,
    },

    performanceScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

// 🔥 Hide password when returning user
userSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password
  return obj
}

module.exports = mongoose.model("User", userSchema)
