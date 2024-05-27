// Route used to get all bible lesson notes
const express = require('express');
const router = express.Router();
const expenseController = require('../../../controllers/api/expenseController');

router.route('/').get(expenseController.readExpenses);

module.exports = router;