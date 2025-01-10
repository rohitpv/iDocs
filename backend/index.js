const connectToMongo = require("./db");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
var cors = require("cors");

// calling the function in "db.js" whihc establishes connection with our mongoDB database
connectToMongo();

// creating the express app on port 3000
const app = express();
const port = 3000;

// parses the req body as json if the content-type of the request is set as application/json
// it's a middle ware that only intercepts if the req content-type is application/json
app.use(cors({
  origin: ["https://i-docs-swart.vercel.app", "http://localhost:5173"],
  credentials: true
}));

// app.use(express.json());
// ********************backend serer related below****************
// the root endpoint that sends a response
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// keeping routing in other files to keep index.js clean and simple
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// starting the application by making it listen for requests on port 3000
app.listen(port, () => {
  console.log(`iDocs backend listening on port ${port}`);
});

// ********************socket server related below****************

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://i-docs-swart.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["my-custom-header"]
  },
  transports: ['websocket', 'polling'],
  path: '/socket.io/' // Explicitly set the path
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