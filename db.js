require("dotenv").config() // to store JWT_PRIVATE_KEY in .env file
const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/notebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
const mongoURI = process.env.DATABASE

const connectToMongoDB = () => {
    mongoose.connect(mongoURI, (err) => {
        console.log("connected to mongoDB successfully")
    })
}
module.exports = connectToMongoDB
