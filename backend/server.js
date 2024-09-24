const express = require('express');
const leaderboardRoutes = require('./api/leaderboard');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

// Enable CORS, restricting it to a specific origin
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Use env for frontend URL
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Connect to the database
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Use the leaderboard routes under /api
app.use('/api', leaderboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});