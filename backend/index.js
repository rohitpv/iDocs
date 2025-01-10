const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

// calling the function in "db.js" whihc establishes connection with our mongoDB database
connectToMongo();

// creating the express app_backend on port 3000
const app_backend = express();
const port = 3000;

// parses the req body as json if the content-type of the request is set as application/json
// it's a middle ware that only intercepts if the req content-type is application/json
app_backend.use(cors());
app_backend.use(express.json());

// the root endpoint that sends a response
app_backend.get("/", (req, res) => {
  res.send("Hello World!");
});

// keeping routing in other files to keep index.js clean and simple
app_backend.use("/api/auth", require("./routes/auth"));
app_backend.use("/api/notes", require("./routes/notes"));

// starting the application by making it listen for requests on port 3000
app_backend.listen(port, () => {
  console.log(`iDocs backend listening on port ${port}`);
});
