require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/mongo/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

// Catch-all for invalid routes (404 error)
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Error-handling middleware (500 error)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
