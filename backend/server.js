const express = require('express');
const leaderboardRoutes = require('./api/leaderboard');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./auth/auth')
require('dotenv').config();

const app = express();


const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));


connectDB();


app.use(express.json());

app.use('/auth', authRoutes);

app.use('/api', leaderboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});