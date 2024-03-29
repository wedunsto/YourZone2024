const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

router.route('/').put(verifyRoles(ROLES_LIST.Admin), userController.updateUserRoles);

module.exports = router;