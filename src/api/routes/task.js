const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/task');
const {isLoggedIn} = require('../middlewares/auth');

router.post('/create', isLoggedIn, TaskController.taskCreate);

router.get('/all', isLoggedIn, TaskController.taskGetAll);

router.get('/:taskId', isLoggedIn, TaskController.taskById);

router.delete('/:taskId', isLoggedIn, TaskController.taskDelete);


module.exports = router;