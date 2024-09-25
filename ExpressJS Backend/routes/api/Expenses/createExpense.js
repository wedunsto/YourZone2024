// Route used to create a new expense
const express = require('express');
const router = express.Router();
const expenseController = require('../../../controllers/api/expenseController');

router.post('/', expenseController.createExpense);

module.exports = router;