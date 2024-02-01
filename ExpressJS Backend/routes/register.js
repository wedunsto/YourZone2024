// Route used to create a new user
const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

router.post('/', registerController.createUser);

module.exports = router;