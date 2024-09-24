const connection = require('../config/db');
const transporter = require('../config/emailConfig');

const registerUser = async (req, res) => {
  const {
    membershipCategory, surname, first_name, other_name, street_address,
    city, country, telephone, email1, email2, occupation, work_organization,
    rank, qualifications, work_experience, payment_type
  } = req.body;

  if (!first_name || !email1) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    // Insert data into the Membership_reg table
    const query = `INSERT INTO Membership_reg (
      membershipCategory, surname, first_name, other_name, street_address, city, country, telephone, 
      email1, email2, occupation, work_organization, rank, qualifications, work_experience, payment_type
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(query, [
      membershipCategory, surname, first_name, other_name, street_address, city, country, telephone,
      email1, email2, occupation, work_organization, rank, qualifications, work_experience, payment_type
    ], async (err, result) => {
      if (err) {
        console.error('Database insertion error:', err);
        return res.status(500).json({ message: 'Error saving registration' });
      }

      const memberId = result.insertId;

      // Email to user
      await transporter.sendMail({
        from: `SISTN <${process.env.EMAIL_USER}>`,
        to: email1,
        subject: "Registration Successful",
        text: `Dear ${first_name},\n\nThank you for submitting your membership application. Your membership is currently pending. \n\nTo complete your membership, please make payment to the account number below and send proof of payment (EOP) to membership@SISTN.com.\n\nBank Account Details:\nAccount Name: SISTN\nAccount Number: 1234567890\nBank: ABC Bank\n\nYour membership number and further details will be confirmed once payment is verified.\n\nBest regards,\nSISTN Membership Team`,
        attachments: [
          { // Include their filled form as a PDF attachment (or use other formats)
            filename: 'membership_details.txt',
            content: JSON.stringify(req.body, null, 2)
          }
        ]
      });

      // Email to admin
      await transporter.sendMail({
        from: `SISTN <${process.env.EMAIL_ADMIN}>`,
        to: process.env.EMAIL_ADMIN,
        subject: "New Membership Application",
        text: `A new membership application has been submitted.\n\nDetails:\nName: ${first_name} ${surname}\nMembership Category: ${membershipCategory}\nEmail: ${email1}\nTelephone: ${telephone}\n\nAwaiting proof of payment.\n\nRegards,\nSISTN Membership Team`,
        attachments: [
          { // Include the form for admin review
            filename: 'membership_details.txt',
            content: JSON.stringify(req.body, null, 2)
          }
        ]
      });

      res.status(201).json({
        message: "Registration successful!",
        redirect: "/thank-you"
      });
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error processing registration" });
  }
};

module.exports = { registerUser };
