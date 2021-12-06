const jwt = require("jsonwebtoken")
const Joi = require("joi")

// Generate auth token
exports.generateAuthToken = (user) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
  return token
}

// Validate user fields
exports.validateFields = (user) => {
  const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  });
  return schema.validate(user)
};