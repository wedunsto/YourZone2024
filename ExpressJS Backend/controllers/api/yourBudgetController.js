// Controller functions called by Transactions routes
const Transactions = require('../../models/Transactions');
const Budgets = require('../../models/Budgets');
const eventLogger = require('../../middleware/logEvents');

// Create new transaction
const createTransaction = async (req, res) => {
    const { userId, description, amount, category, date} = req.body;
    let newCategory = category;

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

    // If no category is provided, set it to None
    if(!category) {
        newCategory = "None";
    }

    try {
        // Create and store a new transaction
        const newTransaction = {
            "userId": userId,
            "description": description,
            "amount": amount,
            "category": newCategory,
            "date": date
        };

        await Transactions.create(newTransaction);

        eventLogger.logEvents('Successfully created a new transaction');

        // Return the new transactions
        res.status(201).json(newTransaction);
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

    const transactions = await Transactions.find(
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
        const updatedTransaction = await Transactions.findOneAndUpdate(
            {_id: transactionId},
            {$set: updatedData},
            {new: true}

        );
        eventLogger.logEvents('Transaction updated.');
        return res.status(200).json(updatedTransaction);
    } catch(err) {
        eventLogger.logEvents(`Error encountered while updating Transaction: ${err.message}`);
        res.status(400).json({ 'message': err.message });
    }
}

// Delete an existing transaction
const deleteTransaction = async (req, res) => {
    const { transactionId } = req.query;

    try {
        const deletedTransaction = await Transactions.findOneAndDelete({
            _id: transactionId
        });

        if (!deletedTransaction) {
            eventLogger.logEvents('Transaction not found.');
            return res.status(404).json({
                'message': 'Transaction not found'
            });
        }

        eventLogger.logEvents('Transaction successfully deleted.');
        return res.status(200).json(deletedTransaction);
    } catch(err) {
        eventLogger.logEvents(`Error encountered while deleting Transaction: ${err.message}`);
        return res.status(404).json({
            'message': `Error encountered while deleting Transaction: ${err.message}`
        });
    }
}

// Create a new budget for a user
const createBudget = async (req, res) => {
    const { userId, description, amount, amountPerCheck, category, dateSubmitted, futureDate} = req.body;
    let newCategory = category;

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
    // If there is no category, set it to none
    if(!category) {
        newCategory = "None";
    }

    const newBudgetProperties = {
        "userId": userId,
        "description": description,
        "amount": amount,
        "category": newCategory
    };

    if (amountPerCheck) {
        newBudgetProperties.amountPerCheck = amountPerCheck;
    }

    if(dateSubmitted) {
        newBudgetProperties.dateSubmitted = dateSubmitted;
    }

    if (futureDate) {
        newBudgetProperties.futureDate = futureDate;
    }

    try {
        // Create and store a new transaction
        const newBudget = await Budgets.create(newBudgetProperties);

        eventLogger.logEvents('Successfully created a new budget');
        return res.status(201).json(newBudget);
    } catch(err) {
        eventLogger.logEvents(`Error encountered while created an budget: ${err.message}`);
        return res.status(500).json({ 'message': err.message });
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

    const budgets = await Budgets.find(
        { userId: userId }
    );

    if(!budgets) {
        eventLogger.logEvents('No budgets found.');

        return res.status(204).json({ 'message': 'No budgets found.' });
    }

    eventLogger.logEvents('budgets retrieved');
    res.status(200).json(budgets);
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
        const updatedBudget = await Budgets.findOneAndUpdate(
            {_id: budgetId},
            {$set: updatedData},
            {new: true}

        );
        eventLogger.logEvents('Budget updated.');
        return res.status(200).json(updatedBudget);
    } catch(err) {
        eventLogger.logEvents(`Error encountered while updating Budget: ${err.message}`);
        res.status(400).json({ 'message': err.message });
    }
}

// Delete an existing budget
const deleteBudget = async (req, res) => {
    const { budgetId } = req.query;

    try {
        const deletedBudget = await Budgets.findOneAndDelete({
            _id: budgetId
        });
        eventLogger.logEvents('Budget successfully deleted.');
        return res.status(200).json(deletedBudget);
    } catch(err) {
        eventLogger.logEvents(`Error encountered while deleting Budget: ${err.message}`);
        return res.status(404).json({
            'message': `Error encountered while deleting Budget: ${err.message}`
        });
    }
}

// Convert a budget to an transaction
const convertBudget = async (req, res) => {
    const {budgetId} = req.body;
    let deletedBudget = {};

    try {
        deletedBudget = await Budgets.findOneAndDelete({
            _id: budgetId
        });
        eventLogger.logEvents('Budget successfully deleted.');
    } catch(err) {
        eventLogger.logEvents(`Error encountered while deleting Budget: ${err.message}`);
        return res.status(404).json({
            'message': `Error encountered while deleting Budget: ${err.message}`
        });
    }

    try {
        const newTransaction = {
            "userId": deletedBudget.userId,
            "description": deletedBudget.description,
            "amount": deletedBudget.amount,
            "category": deletedBudget.category,
            "date": deletedBudget.futureDate
        }

        const convertedTransaction = await Transactions.create(newTransaction);

        eventLogger.logEvents('Successfully created a new transaction');

        // Return the new transactions
        res.status(201).json(convertedTransaction);
    } catch(err) {
        eventLogger.logEvents(`Error encountered while created an transaction: ${err.message}`);
        res.status(500).json({ 'message': err.message });
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
    deleteBudget,
    convertBudget
}