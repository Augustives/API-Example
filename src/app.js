const express = require('express')
const app = express()
const session = require("express-session");
const mongoose = require('mongoose')
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");

const userRoutes = require('./api/routes/user')



// Connecting to MongoDB
mongoose
  .connect(
    process.env.MONGO_CONNECTION_STRING, 
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to Mongo.");
  })
  .catch((err) => {
    console.log("Error when connecting to Mongo.");
  });

// Applying middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(mongoSanitize());
app.use(helmet());
app.use(cors({}));

// Configuring session token
const sessionConfig = {
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 1, //Lasts one hour
    maxAge: 1000 * 60 * 60 * 1,
  },
};
app.use(session(sessionConfig));

// Applying routes
app.use('/user', userRoutes)

// Treating non existent routes
app.all("*", (req, res, next) => {
  res.status(404).send("Page Not Found");
  next();
});

module.exports = app