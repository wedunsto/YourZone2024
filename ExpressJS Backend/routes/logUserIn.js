const express = require('express');
const router = express.Router();
const authenticateController = require('../controllers/authenticateController');
const userController = require('../controllers/userController');

router.post('/', userController.logUserIn);

module.exports = router;