const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

router.post('/', userController.createUser);

module.exports = router;