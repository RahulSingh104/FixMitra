const router = require("express").Router();
const { protect, authorize } = require("../middleware/auth.middleware");

// USER route
router.get("/user", protect, (req, res) => {
  res.json({
    message: "User dashboard",
    user: req.user,
  });
});

// PROVIDER only
router.get(
  "/provider",
  protect,
  authorize("PROVIDER"),
  (req, res) => {
    res.json({
      message: "Provider dashboard",
    });
  }
);

// ADMIN only
router.get(
  "/admin",
  protect,
  authorize("ADMIN"),
  (req, res) => {
    res.json({
      message: "Admin dashboard",
    });
  }
);

module.exports = router;
