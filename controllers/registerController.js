const { Membership_reg } = require('../models');  // Sequelize model
const transporter = require("../config/emailConfig");

const registerUser = async (req, res) => {
  const {
    membershipCategory,
    surname,
    first_name,
    other_name,
    street_address,
    city,
    country,
    telephone,
    email1,
    email2,
    occupation,
    work_organization,
    rank,
    qualifications,
    work_experience,
    passport,
    payment_type
  } = req.body;

  if (!first_name || !email1) {
    return res.status(400).json({ message: "All required fields must be filled." });
  }

  try {
    // Insert into database
    const membership = await Membership_reg.create({
      membershipCategory,
      surname,
      first_name,
      other_name,
      street_address,
      city,
      country,
      telephone,
      email1,
      email2,
      occupation,
      work_organization,
      rank,
      qualifications,
      work_experience,
      passport,
      payment_type,
      payment_status: 'Pending'
    });

    await transporter.sendMail({
      from: `SISTN Membership Team <${process.env.EMAIL_USER}>`,
      to: email1,
      subject: "Membership Application Pending",
      text: `Dear ${first_name},

Thank you for submitting your membership application. Your membership is currently pending. 

To complete your membership, please make payment to the account number below and send proof of payment (EOP) to membership@SISTN.com.

Bank Account Details:
Account Name: SISTN
Account Number: 1234567890
Bank: ABC Bank

Your membership number and further details will be confirmed once payment is verified.

Best regards,
SISTN Membership Team`,
      attachments: [
        {   // Pass the user's form details as an attachment (PDF or any other format)
            filename: 'membership-details.txt',
            content: `Membership Details:\nName: ${first_name} ${surname}\nEmail: ${email1}\nMembership Category: ${membershipCategory}`
        }
      ]
    });

    // Email to admin
    await transporter.sendMail({
      from: `SISTN Membership Team <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_ADMIN,
      subject: "New Membership Application Submitted",
      text: `A new membership application has been submitted.

Details:
Name: ${first_name} ${surname}
Membership Category: ${membershipCategory}
Email: ${email1}
Telephone: ${telephone}

Awaiting proof of payment.

Regards,
SISTN Membership Team`,
      attachments: [
        {   
          // Pass the user's form as an attachment to the admin
            filename: 'membership-details.txt',
            content: `Membership Details:\nName: ${first_name} ${surname}\nEmail: ${email1}\nMembership Category: ${membershipCategory}\nTelephone: ${telephone}`
        }
      ]
    });

    res.status(201).json({ 
      message: "Registration successful! Please check your email for payment instructions.",
      redirect: "/thank-you"
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Registration failed. Please try again later." });
  }
};

module.exports = { registerUser };
