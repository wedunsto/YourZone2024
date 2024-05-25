const allowedOrigins = require('./allowedOrigins.js');

const corsOptions = (req, res, next) => {
    const allowedOrigins = ['http://yourzone.hopto.org', 'http://localhost:5173'];
    const origin = req.headers.origin;
    if(allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
    } else {
      next();
    }
  }

module.exports = corsOptions;