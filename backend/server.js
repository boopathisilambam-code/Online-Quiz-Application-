const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({
  origin: ["https://your-frontend-render-url", "http://localhost:5173"],
  credentials: true
}));

// Routes
app.use("/api/auth", require("./routes/auth")); // ✅ must match filename and path
app.use("/api/user", require("./routes/user"));
// ... other routes

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
