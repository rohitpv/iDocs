// filepath: backend/socketServer.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173", // Adjust this to your frontend's URL
//     methods: ["GET", "POST"]
//   }
// });
// const io = new Server(server)
const io = require('socket.io')(server, {
  cors: {
    origin: ["https://i-docs-swart.vercel.app/", "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
  },
  allowEIO3: true
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