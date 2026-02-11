
const prisma = require("../prisma/client");
const transporter = require("../config/mail");
const { verifyEmailTemplate } = require("../utils/emailTemplate");

exports.sendVerificationEmail = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await prisma.emailOTP.create({
    data: {
      email,
      otp,
      expiresAt,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    html: verifyEmailTemplate(otp),
  });
};
