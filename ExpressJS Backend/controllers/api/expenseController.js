// Controller functions called by Expenses routes
const Expense = require('../../models/Expenses');
const eventLogger = require('../../middleware/logEvents');

// Create new Expense
const createExpense = async (req, res) => {
    const { totalfunds, transactionname, transactionamount} = req.body;

    if(!totalfunds || !transactionname || !transactionamount) {
        eventLogger.logEvents('Please enter the required properties.');
        return res.status(400).json({ 
            'message': 'Please enter the required properties.' 
        });
    }

    try {
        let result;

        // Create and store a new expense
        result = await Expense.create({
            "totalfunds": totalfunds,
            "transactionname": transactionname,
            "transactionamount": transactionamount
        });

        eventLogger.logEvents('Successfully created a new expense');
        res.status(201).json({
            'success': `New expense created!`
        });
    } catch(err) {
        eventLogger.logEvents(`Error encountered while created an expense: ${err.message}`);
        res.status(500).json({ 'message': err.message });
    }
}