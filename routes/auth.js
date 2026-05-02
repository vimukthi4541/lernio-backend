const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { 
            email, password, firstName, lastName, 
            dob, phone, whatsapp, province, 
            district, homeAddress, school 
        } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Create new user
        user = await User.create({
            email,
            password,
            firstName,
            lastName,
            dob,
            phone,
            whatsapp,
            province,
            district,
            homeAddress,
            school
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    } catch (error) {
        console.error('Registration Error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token (currently just returns success)
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user email
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        res.status(200).json({
            success: true,
            message: 'Login successful!',
            data: {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    } catch (error) {
        console.error('Login Error:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
