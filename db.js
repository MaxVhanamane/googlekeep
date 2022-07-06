require("dotenv").config(); // to store JWT_PRIVATE_KEY in .env file
const mongoose = require("mongoose");
const mongoURI = process.env.DATABASE;

const connectToMongoDB = () => {
  mongoose.connect(mongoURI, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("connected to mongoDB successfully");
    }
  });
};
module.exports = connectToMongoDB;
