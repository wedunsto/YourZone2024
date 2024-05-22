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

const PORT = process.env.PORT;

// Connect to MongoDB
connectDB();

// Handle options credentials check - before CORS!
// and fetch cookie credentials requirement
app.use(credentials);
// Enables the frontend to access the backend
//app.use(cors(corsOptions));

app.use((req, res, next) => {
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
});

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
app.use('/getUsersAwaitingApproval', require('./routes/getUsersAwaitingApproval'));
app.use('/updateUserRoles', require('./routes/updateUserRoles'));
app.use('/deleteUser', require('./routes/deleteUser'));
app.use('/createBibleStudyNote', require('./routes/api/createBibleStudyNote'));
app.use('/getBibleStudyNotes/', require('./routes/api/getBibleStudyNotes'));
app.use('/getBibleLessonNotes', require('./routes/api/getBibleLessonNotes'));
app.use('/updateBibleStudyNote', require('./routes/api/updateBibleStudyNote'));
app.use('/updateBibleLessonNotes', require('./routes/api/updateBibleLessonNotes'))
app.use('/deleteBibleStudyNote', require('./routes/api/deleteBibleStudyNote'));

// If our connection to the database fails, we dont want to listen for connections
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
