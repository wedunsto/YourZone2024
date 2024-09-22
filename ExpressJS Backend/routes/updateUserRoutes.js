// Routes used to CRUD user credentials
const express = require('express');
const router = express.Router();
const { getUsersAwaitingApproval, 
    setUserRoleToUser, deleteUser } = require('../controllers/userController');  
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

router.route('/getUsersAwaitingApproval').get(verifyRoles(ROLES_LIST.Admin), getUsersAwaitingApproval);
router.route('/updateUserRole').put(verifyRoles(ROLES_LIST.Admin), setUserRoleToUser);
router.route('/deleteUser').delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

module.exports = router;