const Membership = require('../../models/Membership');
const transporter = require('../../config/emailConfig');

const registerUser = async (req, res) => {
  const {
    membershipCategory, surname, firstName, otherName, streetAddress, city,
    country, telephone, email1, email2, occupation, workOrganization, rank, 
    qualifications, workExperience, paymentType
  } = req.body;

  // Check for required fields
  if (!firstName || !email1) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    // Create a new membership instance
    const newMembership = new Membership({
      membershipCategory,
      surname,
      firstName,
      otherName,
      streetAddress,
      city,
      country,
      telephone,
      email1,
      email2,
      occupation,
      workOrganization,
      rank,
      qualifications,
      workExperience,
      paymentType
    });

    // Save the registration to the database
    const savedMembership = await newMembership.save();

    // Check if the document has been saved
    if (savedMembership) {
        console.log('Membership saved successfully:', savedMembership);
        // You can also check specific fields if necessary
        console.log('Membership ID:', savedMembership._id);
        console.log('Name:', savedMembership.firstName, savedMembership.surname);
        
        // Send email to user
        await transporter.sendMail({
            from: `SISTN <${process.env.EMAIL_USER}>`,
            to: email1,
            subject: "Registration Successful",
            text: `Dear ${firstName},\n\nThank you for submitting your membership application. Your membership is currently pending. \n\nTo complete your membership, please make payment to the account number below and send proof of payment (EOP) to membership@SISTN.com.\n\nBank Account Details:\nAccount Name: SISTN\nAccount Number: 1234567890\nBank: ABC Bank\n\nYour membership number and further details will be confirmed once payment is verified.\n\nBest regards,\nSISTN Membership Team`,
            attachments: [
            { 
                filename: `${firstName}_membership_details.txt`,
                content: JSON.stringify(req.body, null, 2)
            }
            ]
        });
    
        // Send email to admin
        await transporter.sendMail({
            from: `SISTN <${process.env.EMAIL_ADMIN}>`,
            to: process.env.EMAIL_ADMIN,
            subject: "New Membership Application",
            text: `A new membership application has been submitted.\n\nDetails:\nName: ${firstName} ${surname}\nMembership Category: ${membershipCategory}\nEmail: ${email1}\nTelephone: ${telephone}\n\nAwaiting proof of payment.\n\nRegards,\nSISTN Membership Team`,
            attachments: [
            { 
                filename: `${firstName}_membership_details.txt`,
                content: JSON.stringify(req.body, null, 2)
            }
            ]
        });
    
        res.status(201).json({
            message: "Registration successful!",
            redirect: "/thank-you"
        });
    } else {
        console.log('Membership not saved.');
        res.status(500).json({ message: "Error saving membership" });
    }
        // } catch (error) {
        //     console.error('Error saving membership:', error);
        //     res.status(500).json({ message: "Error saving membership" });
        // }
  } catch (error) {
    console.error("Error processing registration:", error);
    res.status(500).json({ message: "Error processing registration" });
  }
};

module.exports = { registerUser };
