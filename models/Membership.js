const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MembershipSchema = new Schema({
  membershipCategory: { type: String, required: true },
  surname: { type: String, required: true },
  firstName: { type: String, required: true },
  otherName: { type: String },
  streetAddress: { type: String },
  city: { type: String },
  country: { type: String },
  telephone: { type: String },
  email1: { type: String, required: true, unique: true },
  email2: { type: String },
  occupation: { type: String },
  workOrganization: { type: String },
  rank: { type: String },
  qualifications: { type: String },
  workExperience: { type: String },
  paymentType: { type: String }
}, { timestamps: true });

const Membership = mongoose.model("Membership", MembershipSchema);

module.exports = Membership;
