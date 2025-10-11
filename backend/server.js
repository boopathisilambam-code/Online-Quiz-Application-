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

// ✅ CORS Configuration
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL, // Render frontend
      'http://localhost:5173'   // Local dev
    ],
    credentials: true,
  })
);

// ✅ Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/user', require('./routes/user'));

// ✅ Root sanity check
app.get('/', (req, res) => {
  res.send('✅ Online Quiz Application API is running...');
});

// ✅ Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({ message: err.message || 'Something went wrong!' });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
