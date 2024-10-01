require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/mongo/connectDB");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB and start the server only after successful connection
connectDB()
  .then((db) => {
    console.log("From Server: MongoDB connected successfully");

    // Routes - Pass the db instance to routes
    app.use("/api/auth", (req, res, next) => {
      req.db = db; // Attach the db instance to req object
      next();
    }, authRoutes);

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
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });