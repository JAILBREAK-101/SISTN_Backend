// const { MongoClient, ServerApiVersion } = require("mongodb");
// const URI = process.env.MONGO_URI || "";
// let db; // Initialize the database instance

// // Initialize the MongoDB client
// const client = new MongoClient(URI, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// const connectDB = async () => {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     console.log("Connected to MongoDB!");

//     // Get the database instance
//     db = client.db("employees");

//     return db;
//   } catch (err) {
//     console.error("MongoDB connection error:", err);
//     throw err;
//   }
// };

const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "";

const connectDB = async () => {
    try {
      // Use connection options for SSL/TLS
      const db = await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        ssl: true, 
        tls: true,
        tlsAllowInvalidCertificates: process.env.NODE_ENV !== "production", // Allows connection with invalid certificates (for dev purposes)
      });
  
      console.log("From MongoDBAtlas: MongoDB connected successfully");
      return db;
    } catch (err) {
      console.error("Failed to connect to MongoDB:", err);
      throw err;
    }
};

module.exports = { connectDB };