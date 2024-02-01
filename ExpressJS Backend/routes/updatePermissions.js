const express = require('express');
const router = express.Router();
const updatePermissionsController = require('../controllers/updatePermissionsController');

router.post('/', updatePermissionsController.updateUserPermissions);

module.exports = router;