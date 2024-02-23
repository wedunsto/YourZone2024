const express = require('express');
const router = express.Router();
const updatePermissionsController = require('../controllers/updatePermissionsController');
const userController = require('../controllers/userController');

router.post('/', userController.updateUserRoles);

module.exports = router;