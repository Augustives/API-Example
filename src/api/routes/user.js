const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const {isLoggedIn} = require('../middlewares/auth');

router.post('/signup', UserController.userSignup);

router.post('/login', UserController.userLogin);

router.delete('/:userId', isLoggedIn, UserController.userDelete);

router.get('/', isLoggedIn, (req, res) => {
  res.send('Auth worked')
})


module.exports = router;