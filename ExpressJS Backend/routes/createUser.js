// Route used to create a new user
const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const userController = require('../controllers/userController');

router.post('/', userController.createUser);

module.exports = router;