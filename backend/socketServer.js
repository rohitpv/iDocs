// filepath: backend/socketServer.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: ["https://i-docs-swart.vercel.app", "http://localhost:5173"],
  credentials: true
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://i-docs-swart.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["my-custom-header"]
  },
  transports: ['websocket', 'polling']
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("noteChange", (note) => {
    io.emit("noteChange", note);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});