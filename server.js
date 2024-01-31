require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const credentials = require('./middleware/credentials');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// Handle options credentials check - before CORS!
// and fetch cookie credentials requirement
app.use(credentials);
// Enables the frontend to access the backend
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// Middleware for cookies
app.use(cookieParser());

// If our connection to the database fails, we dont want to listen for connections
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});