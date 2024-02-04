const express = require('express');
const router = express.Router();
const authenticateController = require('../controllers/authenticateController');

router.post('/', authenticateController.authenticateUser);

module.exports = router;