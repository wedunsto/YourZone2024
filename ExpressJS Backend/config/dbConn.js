const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // these options are depreciated and will be removed
        await mongoose.connect(process.env.DATABASE_URI);
    } catch(err) {
        console.error(err);
    };
};

module.exports = connectDB;