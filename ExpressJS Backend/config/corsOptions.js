const allowedOrigins = require('./allowedOrigins.js');

const corsOptions = {
    origin: (origin, callback) => {
        // only do the OR during development
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;