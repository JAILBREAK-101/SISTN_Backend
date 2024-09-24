const transporter = require("../config/emailConfig");

// Register User Controller
const registerUser = async (req, res) => {
  console.log(req.body) // test
  const { fullName, email } = req.body;
  if (!fullName || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Email to user
    await transporter.sendMail({
      from: `Your Company" ${process.env.EMAIL_USER}`,
      to: email,
      subject: "Registration Successful",
      text: `Hello ${fullName},\n\nThank you for registering!`,
    });

    // Email to admin
    await transporter.sendMail({
      from: `Your Company" ${process.env.EMAIL_ADMIN}`,
      to: process.env.EMAIL_ADMIN,
      subject: "New User Registered",
      text: `
        New registration details:\n
        Fullname: ${fullName}\n
        Email: ${email}`,
    });

    res.status(201).json(
      { message: "Registration successful!",
      redirect: "/thank-you"
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email" });
  }
};

module.exports = { registerUser };
