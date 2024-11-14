const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

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

// Export Express app sebagai handler
module.exports = app;
