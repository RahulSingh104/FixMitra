const transporter = require("../config/mail")
const EmailOTP = require("../models/EmailOTP")
const { verifyEmailTemplate } = require("../utils/emailTemplate")

exports.sendVerificationEmail = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString()

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

  // delete old OTP
  await EmailOTP.deleteMany({ email })

  // save new OTP
  await EmailOTP.create({
    email,
    otp,
    expiresAt,
  })

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    html: verifyEmailTemplate(otp),
  })
}
