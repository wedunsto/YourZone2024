// Controller functions called by Transactions routes
const Transactions = require('../../models/Transactions');
const Budgets = require('../../models/Budgets');
const eventLogger = require('../../middleware/logEvents');

// Create new transaction
const createTransaction = async (req, res) => {
    const { userId, description, 
        amount, category, date} = req.body;

    if(!userId) {
        eventLogger.logEvents('User Id missing.');
        return res.status(400).json({
            'message': 'User Id missing.'
        });
    } else if(!description) {
        eventLogger.logEvents('Transaction description missing.');
        return res.status(400).json({
            'message': 'Transaction description missing.'
        });
    } else if(!amount) {
        eventLogger.logEvents('Transaction amount missing.');
        return res.status(400).json({
            'message': 'Transaction amount missing.'
        });
    }

    try {
        // Create and store a new transaction
        await Transactions.create({
            "userId": userId,
            "description": description,
            "amount": amount,
            "category": category,
            "date": date
        });

        eventLogger.logEvents('Successfully created a new transaction');
        res.status(201).json({
            'success': `New transaction created!`
        });
    } catch(err) {
        eventLogger.logEvents(`Error encountered while created an transaction: ${err.message}`);
        res.status(500).json({ 'message': err.message });
    }
}

// Read all existing transaction
const getTransactions = async (req, res) => {
    const { userId } = req.query;

    if(!userId) {
        eventLogger.logEvents('User Id missing');
        return res.status(404).json({
            'message': 'User Id missing'
        });
    }

    let transactions = await Transactions.find(
        { userId: userId }
    );

    if(!transactions) {
        eventLogger.logEvents('No transactions found.');

        return res.status(204).json({ 'message': 'No transactions found.' });
    }

    eventLogger.logEvents('transactions retrieved');
    res.json(transactions);
}

// Update an existing transaction
const updateTransaction = async (req, res) => {
    const { transactionId } = req.query;
    const { description, amount, category, date } = req.body;

    if(!transactionId) {
        eventLogger.logEvents('Transaction Id is missing');
        return res.status(400).json({
            'message': 'Transaction Id is missing'
        });
    }

    if(!description && !amount && !date) {
        eventLogger.logEvents('No new data provided to update.');
        return res.status(204).json({
            'message': 'No new data provided to update.'
        });
    }

    const updatedData = {};

    if(description) {
        updatedData.description = description;
    }
    if(amount) {
        updatedData.amount = amount;
    }
    if(date) {
        updatedData.date = date;
    }
    if(category) {
        updatedData.category = category;
    }

    try {
        await Transactions.findOneAndUpdate(
            {_id: transactionId},
            {$set: updatedData},
            {new: true}

        );
        eventLogger.logEvents('Transaction updated.');
        return res.status(200).json({
            'message': 'Transaction updated.'
        });
    } catch(err) {
        eventLogger.logEvents(`Error encountered while updating Transaction: ${err.message}`);
        res.status(400).json({ 'message': err.message });
    }
}

// Delete an existing transaction
const deleteTransaction = async (req, res) => {
    const { transactionId } = req.query;

    try {
        await Transactions.findOneAndDelete({
            _id: transactionId
        });
        eventLogger.logEvents('Transaction successfully deleted.');
        return res.status(200).json({
            'message': 'Transaction successfully deleted'
        });
    } catch(err) {
        eventLogger.logEvents(`Error encountered while deleting Transaction: ${err.message}`);
        return res.status(404).json({
            'message': `Error encountered while deleting Transaction: ${err.message}`
        });
    }
}

// Create a new budget for a user
const createBudget = async (req, res) => {
    const { userId, description, amount, amountPerCheck, category, 
        dateSubmitted, futureDate} = req.body;

    if(!userId) {
        eventLogger.logEvents('User Id missing.');
        return res.status(400).json({
            'message': 'User Id missing.'
        });
    } else if(!description) {
        eventLogger.logEvents('Budget description missing.');
        return res.status(400).json({
            'message': 'Budget description missing.'
        });
    } else if(!amount) {
        eventLogger.logEvents('Budget amount missing.');
        return res.status(400).json({
            'message': 'Budget amount missing.'
        });
    }

    newBudget = {
        "userId": userId,
        "description": description,
        "amount": amount,
    };

    if (amountPerCheck) {
        newBudget.amountPerCheck = amountPerCheck;
    }
    if (category) {
        newBudget.category = category;
    }
    if (dateSubmitted) {
        newBudget.dateSubmitted = dateSubmitted;
    }
    if (futureDate) {
        newBudget.futureDate = futureDate;
    }
    try {
        // Create and store a new transaction
        await Budgets.create(newBudget);

        eventLogger.logEvents('Successfully created a new budget');
        res.status(201).json({
            'success': `New budget created!`
        });
    } catch(err) {
        eventLogger.logEvents(`Error encountered while created an budget: ${err.message}`);
        res.status(500).json({ 'message': err.message });
    }
}

// Get all existing budgets for a user
const getBudgets = async (req, res) => {
    const { userId } = req.query;

    if(!userId) {
        eventLogger.logEvents('User Id missing');
        return res.status(404).json({
            'message': 'User Id missing'
        });
    }

    let budgets = await Budgets.find(
        { userId: userId }
    );

    if(!budgets) {
        eventLogger.logEvents('No budgets found.');

        return res.status(204).json({ 'message': 'No budgets found.' });
    }

    eventLogger.logEvents('budgets retrieved');
    res.json(budgets);
}

// Update an existing budget
const updateBudget = async (req, res) => {
    const { budgetId } = req.query;
    const { description, amount, amountPerCheck, category,
         dateSubmitted, futureDate } = req.body;

    if(!budgetId) {
        eventLogger.logEvents('Budget Id is missing');
        return res.status(400).json({
            'message': 'Budget Id is missing'
        });
    }

    if(!description && !amount && !futureDate && !amountPerCheck && !dateSubmitted) {
        eventLogger.logEvents('No new data provided to update.');
        return res.status(204).json({
            'message': 'No new data provided to update.'
        });
    }

    const updatedData = {};

    if(description) {
        updatedData.description = description;
    }
    if(amount) {
        updatedData.amount = amount;
    }
    if (amountPerCheck) {
        updatedData.amountPerCheck = amountPerCheck;
    }
    if (category) {
        updatedData.category = category;
    }
    if (dateSubmitted) {
        updatedData.dateSubmitted;
    }
    if(futureDate) {
        updatedData.futureDate = futureDate;
    }

    try {
        await Budgets.findOneAndUpdate(
            {_id: budgetId},
            {$set: updatedData},
            {new: true}

        );
        eventLogger.logEvents('Budget updated.');
        return res.status(200).json({
            'message': 'Budget updated.'
        });
    } catch(err) {
        eventLogger.logEvents(`Error encountered while updating Budget: ${err.message}`);
        res.status(400).json({ 'message': err.message });
    }
}

// Delete an existing budget
const deleteBudget = async (req, res) => {
    const { budgetId } = req.query;

    try {
        await Budgets.findOneAndDelete({
            _id: budgetId
        });
        eventLogger.logEvents('Budget successfully deleted.');
        return res.status(200).json({
            'message': 'Budget successfully deleted'
        });
    } catch(err) {
        eventLogger.logEvents(`Error encountered while deleting Budget: ${err.message}`);
        return res.status(404).json({
            'message': `Error encountered while deleting Budget: ${err.message}`
        });
    }
}

module.exports = {
    createTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
    createBudget,
    getBudgets,
    updateBudget,
    deleteBudget
}