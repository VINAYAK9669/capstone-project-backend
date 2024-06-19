const express = require("express");
const router = express.Router();
const Job = require("../model/Job");
const validateNewJobs = require("../middleware/ValidateNewJobs");
const errorHandler = require("../middleware/errorHandler");
const mongoose = require("mongoose"); // Import mongoose

// Route for adding a new job
router.post("/add", validateNewJobs, async (req, res, next) => {
  const {
    companyName,
    logoURL,
    jobTitle,
    monthlySalary,
    jobType,
    remote,
    location,
    jobDescription,
    aboutCompany,
    skillsRequired,
    additionalInformation,
    author,
  } = req.body;

  const newJob = new Job({
    companyName,
    logoURL,
    jobTitle,
    monthlySalary,
    jobType,
    remote,
    location,
    jobDescription,
    aboutCompany,
    skillsRequired,
    additionalInformation,
    author,
  });

  try {
    await newJob.save();
    res.status(201).json({
      message: "Job added successfully",
      status: "Working",
      job: newJob._id,
    });
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

// Route for fetching all jobs
router.get("/", getFilteredJobs);

// Route for fetching a job by ID
router.get("/:id", async (req, res, next) => {
  try {
    const jobId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }
    const job = await Job.findById(jobId);

    if (job) {
      res.status(200).json({
        message: "Job Found",
        job: job,
      });
    } else {
      res.status(404).json({
        message: "Job not found",
      });
    }
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

// Error handling middleware should be the last middleware
router.use(errorHandler);

const getFilteredJobs = async (req, res, next) => {
  try {
    const { minSalary, maxSalary, jobType, location, remote, skills } =
      req.query;
    console.log(minSalary, maxSalary, jobType, location);

    // Parse the skills query parameter into an array
    let skillsArray = skills
      ? skills.split(",").map((skill) => skill.trim())
      : [];
    const jobs = await Job.find({
      monthlySalary: {
        $gte: minSalary || 0,
        $lte: maxSalary || 999999,
      },
      jobType: jobType || { $exists: true },
      location: location || { $exists: true },
      remote: remote == "true" || { $exists: true },
      skillsRequired:
        skillsArray.length > 0 ? { $in: skillsArray } : { $exists: true },
    }); // Await the asynchronous call

    res.status(200).json({
      message: "Job route is working fine",
      status: "Working",
      jobs: jobs,
    });
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};

module.exports = router;
