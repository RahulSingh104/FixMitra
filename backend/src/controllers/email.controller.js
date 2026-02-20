const { Resend } = require("resend")
const EmailOTP = require("../models/EmailOTP")

const resend = new Resend(process.env.RESEND_API_KEY)

exports.sendVerificationEmail = async (email) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

    await EmailOTP.deleteMany({ email })

    await EmailOTP.create({
      email,
      otp,
      expiresAt,
    })

    console.log(`OTP for ${email}: ${otp}`)

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Your OTP Code",
      html: `
        <h2>Your OTP Code</h2>
        <h1>${otp}</h1>
        <p>This OTP is valid for 10 minutes.</p>
      `,
    })

    console.log("✅ Email sent successfully")

  } catch (err) {
    console.error("❌ MAIL ERROR:", err)
  }
}
