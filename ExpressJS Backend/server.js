require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const verifyJWT = require('./middleware/verifyJWT');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
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

// Routes
app.use('/register', require('./routes/createUser'));
app.use('/login', require('./routes/logUserIn'));
// Receives the cookie that has the refresh token
app.use('/refresh', require('./routes/refresh'));

// Everything after this line will use the verifyJWT middleware
// to protect the route
app.use(verifyJWT);

app.use('/logout', require('./routes/logUserOut'));
app.use('/updateUserRoles', require('./routes/updateUserRoles'));
app.use('/deleteUser', require('./routes/deleteUser'));
app.use('/createBibleStudyNote', require('./routes/api/createBibleStudyNote'));
app.use('/getBibleStudyNotes', require('./routes/api/getBibleStudyNotes'));
app.use('/updateBibleStudyNote', require('./routes/api/updateBibleStudyNote'));
app.use('/deleteBibleStudyNote', require('./routes/api/deleteBibleStudyNote'));

// If our connection to the database fails, we dont want to listen for connections
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});