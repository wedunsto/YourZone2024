// Schema for the Expenses collection
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expensesSchema = new Schema({
    totalfunds: {
        type: Number,
        set: value => {
            return Math.round(value * 100) / 100;
        },
        required: true
    },
    transactionname: {
        type: String,
        required: true
    },
    transactionamount: {
        type: Number,
        set: value => {
            return Math.round(value * 100) / 100;
        },
        required: true
    }
});

module.exports = mongoose.model('Expense', expensesSchema)