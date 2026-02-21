const User = require("../models/User");
const EmailOTP = require("../models/EmailOTP");
const { hashPassword, comparePassword } = require("../utils/password");
const { generateToken } = require("../utils/jwt");
const { sendVerificationEmail } = require("./email.controller");

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      provider: "EMAIL",
      role: "USER",
      isVerified: true,  // Set to true for testing; change to false in production
    });

    // send email async (non-blocking)
    sendVerificationEmail(email).catch((err) =>
      console.error("Email failed:", err),
    );

    res.status(201).json({
      message: "OTP sent to email",
      email,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.provider !== "EMAIL") {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (user.isBlocked) {
      return res.status(403).json({ message: "Account blocked by admin" });
    }

    const token = generateToken({
      id: user._id,
      role: user.role,
    });

    res.json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================= VERIFY OTP =================
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await EmailOTP.findOne({ email }).sort({ createdAt: -1 });

    if (!record || record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (record.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true },
    );

    await EmailOTP.deleteMany({ email });

    const token = generateToken({
      id: user._id,
      role: user.role,
    });

    res.json({
      message: "Email verified successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("OTP ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
