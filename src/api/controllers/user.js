const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const { generateAuthToken, validateFields } = require('../helpers/auth')

exports.userSignup = async (req, res, next) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email
      },
    })
    if (user) return res.status(409).json({
      message: 'Email already registered'
    })

    const password = await bcrypt.hash(req.body.password, 10)
    await prisma.user.create({
      data: {
        email: req.body.email,
        password: password
      }
    })

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
    const error = validateFields(req.body).error
    if (error) return res.status(400).json({
      error: 'Invalid email or password'
    })

    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email
      },
    })
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

    const token = generateAuthToken(user);
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
    await prisma.user.delete({
      where: {
        id: req.params.userId
      }
    })
    res.status(200).json({
      message: 'User deleted'
    });
  } catch(err)  {
    res.status(500).json({
      error: err
    })
  }
}