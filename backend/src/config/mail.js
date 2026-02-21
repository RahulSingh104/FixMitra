// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587, // ✅ CHANGE THIS
//   secure: false, // ❌ NOT TRUE
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// })

// transporter.verify((error, success) => {
//   if (error) {
//     console.error("❌ MAIL ERROR:", error)
//   } else {
//     console.log("✅ Mail server ready")
//   }
// })

// module.exports = transporter;


const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

transporter.verify((error) => {
  if (error) {
    console.error("❌ MAIL ERROR:", error)
  } else {
    console.log("✅ Gmail SMTP ready")
  }
})

module.exports = transporter