// Routes used to CRUD user credentials
const express = require('express');
const router = express.Router();
const { createUser, logUserIn, 
    logUserOut } = require('../controllers/userController');  

router.post('/', createUser);
router.get('/login', logUserIn);
router.get('/logout', logUserOut);

module.exports = router;