const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const MembershipSchema = new mongoose.Schema({
//   membershipCategory: { type: String, required: false },
//   surname: { type: String, required: false }, 
//   firstName: { type: String, required: true }, 
//   otherName: { type: String, required: false },  
//   streetAddress: { type: String, required: false }, 
//   state: { type: String, required: false },
//   graduationYear: { type: String, required: false },
//   telephone: { type: String, required: false }, 
//   email1: { type: String, required: true }, 
//   email2: { type: String, required: false },  
//   occupation: { type: String, required: false },  
//   workOrganization: { type: String, required: false },
//   rank: { type: String, required: false }, 
//   qualifications: { type: String, required: false }, 
//   workExperience: { type: String, required: false }, 
//   paymentType: { type: String, required: false },
// }, { timestamps: true });

const MembershipSchema = new mongoose.Schema({
    surname: { type: String, required: false },
    firstName: { type: String, required: true },
    otherName: { type: String, required: false },
    streetAddress: { type: String, required: false },
    state: { type: String, required: false },
    telephone: { type: String, required: false },
    countryCode: { type: String, required: false },
    email1: { type: String, required: true },
    email2: { type: String, required: false },
    passport: { type: Object, required: false },
    institution: { type: String, required: false },
    otherInstitution: { type: String, required: false },
    occupation: { type: String, required: false },
    workOrganization: { type: String, required: false },
    rank: { type: String, required: false },
    qualifications: { type: String, required: false },
    graduationYear: { type: String, required: false },
    declaration: { type: Boolean, required: false },
    paymentType: { type: String, required: false },
    membershipCategory: { type: String, required: false },
}, {timestamps: true});

const Membership = mongoose.model("Membership", MembershipSchema);

module.exports = Membership;
