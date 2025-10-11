// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// ✅ CORS Configuration (update frontend URL)
app.use(cors({
  origin: [
    'https://online-quiz-application-7.onrender.com', // 🔁 replace with your actual frontend Render URL
    'http://localhost:5173' // for local development
  ],
  credentials: true
}));

// ✅ Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/user', require('./routes/user'));

// ✅ Root route (optional sanity check)
app.get('/', (req, res) => {
  res.send('✅ Online Quiz Application API is running...');
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({ message: err.message || 'Something went wrong!' });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
