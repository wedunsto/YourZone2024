const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');
const userController = require('../controllers/userController');

router.get('/', userController.logUserOut);

module.exports = router;