const connectToMongoDB = require("./db")
const express = require('express')
const path = require('path')
const app = express()
const cors = require("cors")
app.use(cors())
const port = process.env.PORT || 5000;

connectToMongoDB()
app.use(express.json())
app.use("/auth", require("./routes/auth"))
app.use("/notes", require("./routes/notes"))


console.log(__dirname)
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '/googlekeep/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/googlekeep/build', 'index.html'));
  });
}
app.listen(port, () => {
  console.log(`Googlekeep app listening on port ${port}`)
})

// middleware is just a fucntion which takes req res next parameter it calls next middleware when we call next()
// The app. use() function is used to mount the specified middleware function(s) at the path which is being specified. It is mostly used to set up middleware for your application.
