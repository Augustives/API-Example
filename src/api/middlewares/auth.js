const jwt = require("jsonwebtoken");

// Checa Login
module.exports.isLoggedIn = (req, res, next) => {
  try {
      const token = req.headers.authorization
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decoded
      return next()
  } catch (error) {
      res.status(400).json({
        message: 'Access denied.'
      })
  }
};