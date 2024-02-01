const express = require('express');
const router = express.Router();
const deleteUserController = require('../controllers/deleteUserController');

router.post('/', deleteUserController.deleteUser);

module.exports = router;