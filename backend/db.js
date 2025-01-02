const mongoose = require("mongoose");

// const mongoURI =<YOUR MONGO DB URI>;
const mongoURI = "mongodb+srv://pvr100rvp:TbwNjjoHZ00j6pHB@mynotescluster.hkngc.mongodb.net/?retryWrites=true&w=majority&appName=MyNotesCluster" 

const connectToMongo = () => {
  mongoose.connect(mongoURI).then(() => {
    console.log("connected to server successfully");
  });
};

module.exports = connectToMongo;
