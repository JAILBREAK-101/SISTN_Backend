require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("../routes/authRoutes");

const app = express();

app.use(express.json());

// Parse Form requests
app.use(express.urlencoded({ extended: true })); 

app.use(cors())

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