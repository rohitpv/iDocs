const mongoose = require("mongoose");

// const mongoURI =<YOUR MONGO DB URI>;
const mongoURI = process.env.MONGO_URI;

const connectToMongo = () => {
  mongoose.connect(mongoURI).then(() => {
    console.log("connected to server successfully");
  });
};

module.exports = connectToMongo;
