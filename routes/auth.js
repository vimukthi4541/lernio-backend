const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// --- 1. Registration Route ---
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists with this email!" });
        }

        const newUser = new User(req.body);
        
        const savedUser = await newUser.save();
        
        res.status(201).json({
            message: "User registered successfully!",
            user: { id: savedUser._id, email: savedUser.email }
        });
    } catch (err) {
        console.error("Register Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// --- 2. Login Route ---
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found! Please register first." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password!" });
        }

        res.json({ 
            message: "Login Successful!", 
            user: { 
                id: user._id, 
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email 
            } 
        });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;