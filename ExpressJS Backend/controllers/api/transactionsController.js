// Controller functions called by Transactions routes
const Transactions = require('../../models/Transactions');
const eventLogger = require('../../middleware/logEvents');

// Create new transaction
const createTransaction = async (req, res) => {
    const { userId, description, 
        amount, date} = req.body;

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
        const result = await Transactions.create({
            "userId": userId,
            "description": description,
            "amount": amount,
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
    const { description, amount, date } = req.body;

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

module.exports = {
    createTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction
}