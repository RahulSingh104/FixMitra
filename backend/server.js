const app = require("./src/app");
const http = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 5000;

// 🔥 Create HTTP server from Express app
const server = http.createServer(app);

// 🔥 Attach Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});


// 🔥 Active users counter
let activeUsers = 0;

io.on("connection", (socket) => {
  activeUsers++;
  console.log("🟢 New user connected");

  io.emit("activeUsers", activeUsers);

  socket.on("disconnect", () => {
    activeUsers--;
    console.log("🔴 User disconnected");

    io.emit("activeUsers", activeUsers);
  });
});

// 🔥 Use server.listen instead of app.listen
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
