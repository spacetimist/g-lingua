require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('../routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Route untuk API
app.get('/', (req, res) => {
  res.send('Hello from Vercel Backend!');
});

// Endpoint contoh lainnya
app.post('/api/register', async (req, res) => {
  // Logika registrasi atau endpoint lainnya
  res.json({ message: 'User registered' });
});


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Export Express app sebagai handler
module.exports = app;
