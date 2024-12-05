// Schema for the Budget MongoDB collection
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: mongoose.Types.Decimal128,
        get: inValue => parseFloat(inValue.toString()),
        set: outValue => {
            return mongoose.Types.Decimal128.fromString(outValue.toFixed(2))
        },
        required: true
    },
    amountPerCheck: {
        type: mongoose.Types.Decimal128,
        get: inValue => parseFloat(inValue.toString()),
        set: outValue => {
            return mongoose.Types.Decimal128.fromString(outValue.toFixed(2))
        },
        required: false
    },
    category :{
        type: String,
        require: false
    },
    dateSubmitted: {
        type: Date,
        default: () => {
            const now = new Date();
            now.setHours(now.getHours() - now.getTimezoneOffset() / 60);
            return now;
        },
    },
    futureDate: {
        type: Date,
        default: () => {
            const now = new Date();
            now.setHours(now.getHours() - now.getTimezoneOffset() / 60);
            return now;
        },
    }
});

module.exports = mongoose.model('Budget', budgetSchema)