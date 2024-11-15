const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const { JWT_SECRET } = process.env;

// Registration Route
router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, name });

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

        const token = jwt.sign({ userId: user._id.toHexString() }, JWT_SECRET, { expiresIn: '1h' });
        const userId = user._id.toHexString();
        console.log("Token generated:", token); // Check if token is created
        console.log("UserId login:", userId); // Check if token is created
        
        res.json({ token, user: { email: user.email, userId } });
    } catch (err) {
        console.error("Login error:", err); // Output any error that occurs
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/verify', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Received token:', token); // Debug: Print token to check if it is received
    
    if (!token) {
        console.log('No token found in request');
        return res.status(401).json({ success: false, message: 'No token provided' });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('UserId: ', decoded.userId);
        return res.json({ success: true, userId: decoded.userId });
    } catch (error) {
        console.error('Token verification error:', error); // Debug: Print verification error details
        return res.status(401).json({ success: false, message: 'Token is invalid or expired' });
    }
});

// Update completed lessons
router.post('/updateProgress', async (req, res) => {
    const {userId}  = req.body;

    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }
    try {
        const user = await User.findById(userId);
        if (user) {
            user.completedLessons += 1;
            await user.save();
            res.json({ success: true, completedLessons: user.completedLessons });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
});

// Route to get user progress
router.get('/getUserProgress/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Find user by ID 
        const user = await User.findById(userId);
        
        if (user) {
            res.json({ 
                success: true, 
                completedLessons: user.completedLessons,
                name: user.name
             });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
});

module.exports = router;
