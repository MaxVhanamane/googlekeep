const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/notebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
const mongoURI = "mongodb+srv://maxvhanamane:MH13OreoMax1998@cluster0.fj2wwwm.mongodb.net/googlekeep?retryWrites=true&w=majority"


const connectToMongoDB = () => {
    mongoose.connect(mongoURI, (err) => {
        console.log("connected to mongoDB successfully")
    })
}
module.exports = connectToMongoDB
