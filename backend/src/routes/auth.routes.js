// const express = require("express");
// const {
//   register,
//   login,
//   verifyOTP,

// } = require("../controllers/auth.controller");
// const { protect } = require("../middleware/auth.middleware")

// const passport = require("passport");
// const router = express.Router();

// router.put("/profile", protect, async (req, res) => {
//   const user = await prisma.user.update({
//     where: { id: req.user.id },
//     data: { name: req.body.name },
//   })

//   res.json(user)
// })


// // AUTH ROUTES
// router.post("/register", register);
// router.post("/login", login);

// // EMAIL VERIFY ROUTE
// router.post("/verify-otp", verifyOTP);
// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   })
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { session: false }),
//   (req, res) => {
//     res.json(req.user);
//   }
// );

// // TEST EMAIL ROUTE (TEMPORARY)
// router.get("/test-email", async (req, res) => {
//   const transporter = require("../config/mail");

//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: process.env.EMAIL_USER,
//     subject: "Test Email",
//     text: "Email is working",
//   });

//   res.send("Email sent successfully");
// });

// module.exports = router;


const express = require("express")
const passport = require("passport")

const {
  register,
  login,
  verifyOTP,
} = require("../controllers/auth.controller")

const { protect } = require("../middleware/auth.middleware")
const User = require("../models/User")

const router = express.Router()

/*
----------------------------------
UPDATE PROFILE (Mongo Version)
----------------------------------
*/
router.put("/profile", protect, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name: req.body.name },
      { new: true }
    )

    res.json(user)

  } catch (err) {
    res.status(500).json({ message: "Profile update failed" })
  }
})

/*
----------------------------------
AUTH ROUTES
----------------------------------
*/
router.post("/register", register)
router.post("/login", login)

/*
----------------------------------
VERIFY OTP
----------------------------------
*/
router.post("/verify-otp", verifyOTP)

/*
----------------------------------
GOOGLE AUTH
----------------------------------
*/
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
)

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.json(req.user)
  }
)

/*
----------------------------------
TEST EMAIL ROUTE
----------------------------------
*/
router.get("/test-email", async (req, res) => {
  const transporter = require("../config/mail")

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "Test Email",
    text: "Email is working",
  })

  res.send("Email sent successfully")
})

module.exports = router
