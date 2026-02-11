const prisma = require("../prisma/client");
const { hashPassword, comparePassword } = require("../utils/password");
const { generateToken } = require("../utils/jwt");
const { sendVerificationEmail } = require("./email.controller");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        provider: "EMAIL",
      },
    });

    await sendVerificationEmail(user.email);

    res.status(201).json({
      message: "OTP sent to email",
      email: user.email,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.provider !== "EMAIL") {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email first",
      });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    res.json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};




exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await prisma.emailOTP.findFirst({
      where: { email, otp },
    });

    if (!record) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (record.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    await prisma.user.update({
      where: { email },
      data: { isVerified: true },
    });

    await prisma.emailOTP.deleteMany({
      where: { email },
    });
    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    res.json({
      message: "Email verified successfully",
      token,
      user,
    });

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "OTP verification failed" });
  }
};

