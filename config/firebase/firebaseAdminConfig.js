const admin = require("firebase-admin");

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(require("./path/to/serviceAccountKey.json")),
  databaseURL: "https://your-project-id.firebaseio.com"
});

module.exports = admin;
