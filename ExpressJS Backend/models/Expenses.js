// Schema for the Expenses collection
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expensesSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    totalfunds: {
        type: mongoose.Types.Decimal128,
        get: inValue => parseFloat(inValue.toString()),
        set: outValue => {
            return mongoose.Types.Decimal128.fromString(outValue.toFixed(2))
        },
        required: true
    },
    transactionname: {
        type: String,
        required: true
    },
    transactionamount: {
        type: mongoose.Types.Decimal128,
        get: inValue => parseFloat(inValue.toString()),
        set: outValue => {
            return mongoose.Types.Decimal128.fromString(outValue.toFixed(2))
        },
        required: true
    }
});

module.exports = mongoose.model('Expense', expensesSchema)