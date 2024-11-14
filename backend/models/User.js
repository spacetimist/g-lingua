const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    progress: { type: Object, default: {} }, // Store user progress if needed
});

module.exports = mongoose.model('User', userSchema);
