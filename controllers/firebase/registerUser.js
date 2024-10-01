const firebaseAdmin = require("../config/firebaseAdminConfig");
const firebase = require("firebase/app");
require("firebase/auth");

// Firebase client-side initialization (this should match your web app config)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
firebase.initializeApp(firebaseConfig);

// Register User Controller
const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body; // Add password if needed

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create a new user with Firebase Authentication
    const userRecord = await firebaseAdmin.auth().createUser({
      email,
      password,
      displayName: fullName,
      emailVerified: false, // Set to true if verification isn't needed
    });

    // Send a verification email to the user
    const actionCodeSettings = {
      url: `https://yourapp.com/verify-email?uid=${userRecord.uid}`,
      handleCodeInApp: true,
    };
    await firebaseAdmin.auth().generateEmailVerificationLink(email, actionCodeSettings);

    // Send notification to admin (using Firebase Cloud Functions or nodemailer)
    // Email to admin
    await transporter.sendMail({
      from: `Your Company <${process.env.EMAIL_ADMIN}>`,
      to: process.env.EMAIL_ADMIN,
      subject: "New User Registered",
      text: `
        New registration details:\n
        Fullname: ${fullName}\n
        Email: ${email}\n
        User UID: ${userRecord.uid}`,
    });

    res.status(201).json({
      message: "Registration successful! Please check your email to verify your account.",
      redirect: "/thank-you",
    });
  } catch (error) {
    console.error("Error registering user or sending email:", error);
    res.status(500).json({ message: "Error registering user or sending email." });
  }
};

module.exports = { registerUser };
