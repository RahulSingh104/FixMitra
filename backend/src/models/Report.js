const mongoose = require("mongoose")

const reportSchema = new mongoose.Schema({
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  reason: String,
}, { timestamps: true })

module.exports = mongoose.model("Report", reportSchema)
