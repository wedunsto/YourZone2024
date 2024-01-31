const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // these options are depreciated and will be removed
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch(err) {
        console.error(err);
    };
};

module.exports = connectDB;