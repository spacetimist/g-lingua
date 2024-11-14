const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const { JWT_SECRET } = process.env;

// Registration Route
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        console.log("User fetched from DB:", user); // Check if the user is found

        if (!user) return res.status(400).json({ error: 'This email has not been registered' });

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch); // Check if password comparison is working

        if (!isMatch) return res.status(400).json({ error: 'Wrong password' });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        console.log("Token generated:", token); // Check if token is created
        
        res.json({ token, user: { email: user.email, progress: user.progress || null } });
    } catch (err) {
        console.error("Login error:", err); // Output any error that occurs
        res.status(500).json({ error: 'Server error' });
    }
});

// router.post('/verify', (req, res) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     console.log('Received token:', token); // Debug: Print token to check if it is received

//     if (!token) {
//         console.log('No token found in request');
//         return res.status(401).json({ success: false, message: 'No token provided' });
//     }

//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         return res.json({ success: true, userId: decoded.userId });
//     } catch (error) {
//         console.error('Token verification error:', error); // Debug: Print verification error details
//         return res.status(401).json({ success: false, message: 'Token is invalid or expired' });
//     }
// });

module.exports = router;
