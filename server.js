const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Mongoose එකතු කළා
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const authRoute = require('./routes/auth');
app.use('/api/auth', authRoute);

// Database Connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
    .then(() => console.log("LernioDB Connected! ✅"))
    .catch(err => console.log("Database connection error: ❌", err));

// Basic Route
app.get('/', (req, res) => {
    res.send('Lernio.lk Backend is Running with Database! 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});