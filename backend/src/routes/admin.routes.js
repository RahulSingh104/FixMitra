const router = require("express").Router();
const { protect, authorize } = require("../middleware/auth.middleware");
const User = require("../models/User");
const Service = require("../models/Service");
const Booking = require("../models/Booking");

// ================= GET ALL USERS =================
router.get("/users", protect, authorize("ADMIN"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error("Fetch users error:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// ================= DASHBOARD STATS =================
router.get("/stats", protect, authorize("ADMIN"), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "USER" });
    const totalProviders = await User.countDocuments({ role: "PROVIDER" });
    const totalServices = await Service.countDocuments();
    const totalBookings = await Booking.countDocuments();

     // Booking Status Count
    const pending = await Booking.countDocuments({ status: "PENDING" });
    const accepted = await Booking.countDocuments({ status: "ACCEPTED" });
    const completed = await Booking.countDocuments({ status: "COMPLETED" });

    // 🔥 REVENUE FROM COMPLETED BOOKINGS ONLY
    const revenueData = await Booking.aggregate([
      { $match: { status: "COMPLETED" } },
      {
        $lookup: {
          from: "services",
          localField: "service",
          foreignField: "_id",
          as: "serviceData",
        },
      },
      { $unwind: "$serviceData" },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$serviceData.price" },
        },
      },
    ]);

    const revenue = revenueData[0]?.totalRevenue || 0;
    const monthlyBookings = await Booking.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

  // Safe defaults for advanced fields
    const lastMonthRevenue = 0;
    const activeUsers = 0;
    const onlineProviders = 0;
    const reports = 0;
    const topProviders = [];

    res.json({
      users: totalUsers,
      providers: totalProviders,
      services: totalServices,
      bookings: totalBookings,
      revenue,
      monthlyBookings,
      pending,
      accepted,
      completed,
      lastMonthRevenue,
      activeUsers,
      onlineProviders,
      reports,
      topProviders,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ message: "Stats fetch failed" });
  }
});

// ================= BLOCK USER =================
router.patch("/block/:id", protect, authorize("ADMIN"), async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isBlocked: true },
    { new: true },
  );

  res.json(user);
});

// ================= UNBLOCK USER =================
router.patch("/unblock/:id", protect, authorize("ADMIN"), async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isBlocked: false },
    { new: true },
  );

  res.json(user);
});

// ================= DELETE PROVIDER =================
router.delete(
  "/provider/:id",
  protect,
  authorize("ADMIN"),
  async (req, res) => {
    await Service.deleteMany({ provider: req.params.id });
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "Provider deleted successfully" });
  },
);

// ================= RECENT ACTIVITY =================
router.get("/activity", protect, authorize("ADMIN"), async (req, res) => {
  const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);
  const recentBookings = await Booking.find()
    .populate("user service")
    .sort({ createdAt: -1 })
    .limit(5);

  res.json({ recentUsers, recentBookings });
});

module.exports = router;
