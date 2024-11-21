const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "";

const connectDB = async () => {
    try {
      const db = await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        ssl: true, 
        tls: true,
        tlsAllowInvalidCertificates: process.env.NODE_ENV !== "production",
      });
  
      console.log("From MongoDBAtlas: MongoDB connected successfully");
      return db;
    } catch (err) {
      console.error("Failed to connect to MongoDB:", err);
      throw err;
    }
};

module.exports = { connectDB };
