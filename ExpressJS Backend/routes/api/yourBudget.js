const express = require('express');
const router = express.Router();
const { createTransaction, getTransactions, 
    updateTransaction, deleteTransaction,
    createBudget, getBudgets, updateBudget,
    deleteBudget, convertBudget } = require('../../controllers/api/yourBudgetController');

// Transactions
router.post('/transactions', createTransaction);
router.get('/transactions', getTransactions);
router.put('/transactions', updateTransaction);
router.delete('/transactions', deleteTransaction);

// Budgets
router.post('/budgets', createBudget);
router.get('/budgets', getBudgets);
router.put('/budgets', updateBudget);
router.delete('/budgets', deleteBudget);
router.post('/convertBudget', convertBudget);

module.exports = router;