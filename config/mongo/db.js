// const mongoose = require("mongoose");

// // const UNEXPOSED_MONGO_URI = `mongodb+srv://GenixTech:${process.env.SISTN_MONGO_PASSWORD}@cluster0.nsnvv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// const connectDB = async () => {
//   try {
//     // Connect to the MongoDB database using the URI from your .env file
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB connected successfully.");
//   } catch (err) {
//     console.error("MongoDB connection error:", err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

// To Test
// 4. Verify SRV Record and DNS Resol ution
// If you're using the mongodb+srv connection string, you can verify the SRV record with the following command (replace the cluster URL accordingly):

// nslookup -q=SRV _mongodb._tcp.cluster0.itpkzvz.mongodb.net
// If this command fails, it means your DNS is not resolving the SRV records correctly. In that case, consider using the non-SRV URI format (as shown in step 2).

const { MongoClient, ServerApiVersion } = require("mongodb");

const URI = process.env.MONGO_URI || "";
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function main() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }
}

main();

let connectDB = client.db("employees");
module.exports = connectDB;
