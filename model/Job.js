// company name, logo URL,  job position/title,
// monthly salary, job type, remote, location, job description
// about company, skills required, additional information
const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    logoURL: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    monthlySalary: {
      type: Number,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    remote: {
      type: Boolean,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    aboutCompany: {
      type: String,
      required: true,
    },
    skillsRequired: [
      {
        type: String,
        required: true,
      },
    ],
    additionalInformation: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
