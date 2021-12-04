const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {User, validate} = require('../models/user');

exports.userSignup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) return res.status(409).json({
      message: 'Email already registered'
    })

    const newUser = new User(req.body)
    newUser.password = await bcrypt.hash(newUser.password, 10)
    await newUser.save()

    res.status(201).json({
      message: 'User created'
    })
  } catch (err) {
    return res.status(500).json({
      error: 'Failed to create a user'
    })
  }
}

exports.userLogin = async (req, res, next) => {
  try {
    const error = validate(req.body).error
    if (error) return res.status(400).json({
      error: 'Invalid email or password'
    })

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(401).json({
      message: 'Email not registered'
    })

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!validPassword) return res.status(400).json({
      message: 'Invalid email or password'
    })

    const token = user.generateAuthToken();
    res.json({
      message: 'Logged in successfully',
      token: token
    })
  } catch(err) {
    res.status(500).json({
      error: err
    })
  }
}

exports.userDelete = async (req, res, next) => {
  try {
    await User.remove({ _id: req.params.userId })
    res.status(200).json({
      message: 'User deleted'
    });
  } catch(err)  {
    res.status(500).json({
      error: err
    })
  }
}