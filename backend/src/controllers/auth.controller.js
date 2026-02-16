// const User = require("../models/User")
// const { hashPassword, comparePassword } = require("../utils/password");
// const { generateToken } = require("../utils/jwt");
// const { sendVerificationEmail } = require("./email.controller");

// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({
//         message: "User already exists",
//       });
//     }

//     const hashedPassword = await hashPassword(password);

//     const user = await User.create({

//       data: {
//         name,
//         email,
//         password: hashedPassword,
//         provider: "EMAIL",
//       },
//     });

//     await sendVerificationEmail(user.email);

//     res.status(201).json({
//       message: "OTP sent to email",
//       email: user.email,
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Registration failed" });
//   }
// };


// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user || user.provider !== "EMAIL") {
//       return res.status(400).json({
//         message: "Invalid credentials",
//       });
//     }

//     if (!user.isVerified) {
//       return res.status(403).json({
//         message: "Please verify your email first",
//       });
//     }

//     const isMatch = await comparePassword(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({
//         message: "Invalid credentials",
//       });
//     }

//     const token = generateToken({
//       id: user.id,
//       role: user.role,
//     });

//     res.json({
//       message: "Login successful",
//       token,
//       user,
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Login failed" });
//   }
// };




// exports.verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const record = await prisma.emailOTP.findFirst({
//       where: { email, otp },
//     });

//     if (!record) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     if (record.expiresAt < new Date()) {
//       return res.status(400).json({ message: "OTP expired" });
//     }

//     const user = await prisma.user.update({
//       where: { email },
//       data: { isVerified: true },
//     });

//     await prisma.emailOTP.deleteMany({
//       where: { email },
//     });
//     const token = generateToken({
//       id: user.id,
//       role: user.role,
//     });

//     res.json({
//       message: "Email verified successfully",
//       token,
//       user,
//     });
    
//   } catch (error) {
//     res.status(500).json({ message: "OTP verification failed" });
//   }
// };

const User = require("../models/User")
const EmailOTP = require("../models/EmailOTP")
const { hashPassword, comparePassword } = require("../utils/password")
const { generateToken } = require("../utils/jwt")
const { sendVerificationEmail } = require("./email.controller")

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" })
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await hashPassword(password)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      provider: "EMAIL",
      role: "USER",
      isVerified: false
    })

    await sendVerificationEmail(user.email)

    res.status(201).json({
      message: "OTP sent to email",
      email: user.email
    })

  } catch (error) {
    res.status(500).json({ message: "Registration failed" })
  }
}

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user || user.provider !== "EMAIL") {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email first" })
    }

    const isMatch = await comparePassword(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = generateToken({
      id: user._id,
      role: user.role,
    })

    res.json({
      message: "Login successful",
      token,
      user,
    })

  } catch (error) {
    res.status(500).json({ message: "Login failed" })
  }
}

// VERIFY OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body

    const record = await EmailOTP.findOne({ email, otp })

    if (!record) {
      return res.status(400).json({ message: "Invalid OTP" })
    }

    if (record.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" })
    }

    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    )

    await EmailOTP.deleteMany({ email })

    const token = generateToken({
      id: user._id,
      role: user.role,
    })

    res.json({
      message: "Email verified successfully",
      token,
      user,
    })

  } catch (error) {
    res.status(500).json({ message: "OTP verification failed" })
  }
}
