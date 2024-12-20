require('dotenv').config()

const playlistRoutes = require("./Routes/playlistRoute")
const authRoutes = require("./Routes/authRoute")
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')
// middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
}))

app.use('/api/playlist', playlistRoutes)
app.use('/api/auth', authRoutes)
// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
})
