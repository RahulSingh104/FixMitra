const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth.routes");
const testRoutes = require("./routes/test.routes");

const serviceRoutes = require("./routes/service.routes");
const bookingRoutes = require("./routes/booking.routes");
const reviewRoutes = require("./routes/review.routes");
const paymentRoutes = require("./routes/payment.routes");
const adminRoutes = require("./routes/admin.routes")
const connectDB = require("./config/db")

connectDB()


const app = express();

// Middlewares
app.use(
  cors({
    origin: "*", // Later restrict to frontend domain
  })
);
app.use(express.json({ limit: "10mb" }));

app.use("/api/test", testRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes)
app.use("/api/reports", require("./routes/report.routes"))







// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
  });
});


module.exports = app;
