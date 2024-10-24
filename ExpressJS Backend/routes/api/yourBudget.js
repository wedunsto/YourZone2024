const express = require('express');
const router = express.Router();
const { createTransaction, getTransactions, updateTransaction, deleteTransaction } = require('../../controllers/api/transactionsController');

router.post('/transactions', createTransaction);
router.get('/transactions', getTransactions);
router.put('/transactions', updateTransaction);
router.delete('/transactions', deleteTransaction);

module.exports = router;