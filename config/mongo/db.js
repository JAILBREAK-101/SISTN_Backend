const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Connect to the MongoDB database using the URI from your .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

// To Test
// 4. Verify SRV Record and DNS Resolution
// If you're using the mongodb+srv connection string, you can verify the SRV record with the following command (replace the cluster URL accordingly):

// bash
// Copy code
// nslookup -q=SRV _mongodb._tcp.cluster0.itpkzvz.mongodb.net
// If this command fails, it means your DNS is not resolving the SRV records correctly. In that case, consider using the non-SRV URI format (as shown in step 2).