// algoviz-pro-backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database (assuming ./config/db.js exists)
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Allows parsing of JSON request body (for POST/PUT requests)
app.use(cors({
    // IMPORTANT: Ensure this matches your frontend's running URL exactly
    origin: 'http://localhost:5173', 
}));

// -----------------------------------------------------------------
// Route Imports
// -----------------------------------------------------------------
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes'); // For saving/fetching visualization states
const aiRoutes = require('./routes/aiRoutes');     // For Gemini AI Tutor interaction

// -----------------------------------------------------------------
// Route Usage
// -----------------------------------------------------------------
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/ai', aiRoutes); // This is where the fixed controller is used

// Simple default route to confirm API status
app.get('/', (req, res) => {
    res.send('AlgoViz Pro API is running and ready for connection.');
});

// Set port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));