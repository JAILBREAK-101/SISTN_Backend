const Membership = require('../../models/Membership');
const transporter = require('../../config/emailConfig');
const helpers = require("../../utils/helpers");

const registerUser = async (req, res) => {
  const {
    surname, firstName, otherName, streetAddress, state, telephone, countryCode, email1, email2, passport, institution,
    otherInstitution, occupation, workOrganization, rank, qualifications, graduationYear, declaration, paymentType,
    membershipCategory
  } = req.body;

  console.log(firstName, surname);

  // Define required fields
  const requiredFields = ["firstName", "email1"];

  // Validate required fields
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ message: `The field "${field}" is required.` });
    }
  }

  try {
    // Create a new membership instance
    const newMembership = new Membership({
      membershipCategory,
      surname,
      firstName,
      otherName,
      streetAddress,
      state,
      graduationYear,
      telephone,
      email1,
      email2,
      passport,
      institution,
      occupation,
      workOrganization,
      declaration,
      rank,
      otherInstitution,
      qualifications,
      paymentType
    });

    // Save the membership to the database
    const savedMembership = await newMembership.save();

    // Check if the document has been saved successfully
    if (!savedMembership) {
      console.log('Membership not saved.');
      return res.status(500).json({ message: "Error saving membership" });
    }

    console.log('Membership saved successfully:', savedMembership);
    console.log('Membership ID:', savedMembership._id);
    console.log('Name:', savedMembership.firstName, savedMembership.surname);

    // Generate PDF from the request data after saving the data to the database
    let pdfBuffer;
    try {
      pdfBuffer = await helpers.createPDF(req.body, "Membership Registration Details");
    } catch (pdfError) {
      console.error("Error generating PDF:", pdfError);
      await Membership.findByIdAndDelete(savedMembership._id); // Delete saved membership if PDF generation fails
      return res.status(500).json({ message: "Error generating PDF. Registration rolled back." });
    }

    // Send email to the user and admin
    try {
      // Send email to user
      await transporter.sendMail({
        from: `SISTN <${process.env.EMAIL_USER}>`,
        to: email1,
        subject: "Registration Successful",
        text: `Dear ${firstName},\n\nThank you for submitting your membership application. Your membership is currently pending. \n\nTo complete your membership, please make payment to the account number below and send proof of payment (EOP) to membership@SISTN.com.\n\nBank Account Details:\nAccount Name: SISTN\nAccount Number: 1234567890\nBank: ABC Bank\n\nYour membership number and further details will be confirmed once payment is verified.\n\n Please find attached your registration details in the PDF document.\n\n Best regards,\nSISTN Membership Team`,
        attachments: [
          {
            filename: `${firstName}_membership_details.pdf`,
            content: pdfBuffer,
          },
        ],
      });

      // Send email to admin
      await transporter.sendMail({
        from: `SISTN <${process.env.EMAIL_ADMIN}>`,
        to: process.env.EMAIL_ADMIN,
        subject: "New Membership Application",
        text: `A new membership application has been submitted.\n\nDetails:\nName: ${firstName} ${surname}\nMembership Category: ${membershipCategory}\nEmail: ${email1}\nTelephone: ${telephone}\n\nAwaiting proof of payment.\n\nRegards,\nSISTN Membership Team`,
        attachments: [
          {
            filename: `${firstName}_membership_details.pdf`,
            content: pdfBuffer,
          },
        ],
      });

      // Respond with success
      res.status(201).json({
        message: "Registration successful!",
        redirect: "/thank-you"
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);

      // Delete the saved membership if email sending fails
      try {
        await Membership.findByIdAndDelete(savedMembership._id);
        console.log(`Membership ${savedMembership._id} deleted due to email error.`);
      } catch (deleteError) {
        console.error('Error deleting membership after email failure:', deleteError);
      }

      return res.status(500).json({ message: "Error sending email. Registration rolled back." });
    }
  } catch (dbError) {
    // Handle errors related to saving membership to the database
    console.error("Error processing registration:", dbError);
    res.status(500).json({ message: "Error processing registration" });
  }
};

module.exports = { registerUser };
