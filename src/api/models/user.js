const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Joi = require("joi");

// Defining user schema
const userSchema = mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
    },
    password: { type: String, required: true }
});

// User model method to generate auth token
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}

// Creating user model
const User = mongoose.model("User", userSchema);

// Validate user fields
const validate = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });
    return schema.validate(user);
};

module.exports = { User, validate };