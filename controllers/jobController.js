const Job = require("../model/Job");
const mongoose = require("mongoose");

function getJobById() {
  return async (req, res, next) => {
    try {
      const jobId = req.params.id;

      // Check if the provided job ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({ message: "Invalid job ID" });
      }

      // Fetch the job by ID\\\
      const job = await Job.findById(jobId);

      // Check if the job was found
      if (job) {
        return res.status(200).json({
          message: "Job Found",
          job: job,
        });
      } else {
        return res.status(404).json({
          message: "Job not found",
        });
      }
    } catch (error) {
      // Pass any errors to the error handling middleware
      next(error);
    }
  };
}

function creatNewJob() {
  return async (req, res, next) => {
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

    const refUserId = req.refUserId;
    console.log(refUserId);

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
      refUserId,
    });

    try {
      await newJob.save();
      res.status(201).json({
        message: "Job added successfully",
        status: "Working",
        job: newJob._id,
      });
    } catch (error) {
      next(error);
    }
  };
}

async function getFilteredJobs(req, res, next) {
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
        $lte: maxSalary || 99999999,
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
}

function updateJob() {
  return async (req, res, next) => {
    try {
      const jobId = req.params.id;
      const updates = req.body;

      // Check if the provided job ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({ message: "Invalid job ID" });
      }

      // Update the job by ID
      const updatedJob = await Job.findByIdAndUpdate(jobId, updates, {
        new: true,
        runValidators: true,
      });

      // Check if the job was found and updated
      if (updatedJob) {
        return res.status(200).json({
          message: "Job updated successfully",
          job: updatedJob,
        });
      } else {
        return res.status(404).json({
          message: "Job not found",
        });
      }
    } catch (error) {
      // Pass any errors to the error handling middleware
      next(error);
    }
  };
}

function deleteJob() {
  return async (req, res, next) => {
    try {
      const jobId = req.params.id;

      // Check if the provided job ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({ message: "Invalid job ID" });
      }

      // Delete the job by ID
      const deletedJob = await Job.findByIdAndDelete(jobId);

      // Check if the job was found and deleted
      if (deletedJob) {
        return res.status(200).json({
          message: "Job deleted successfully",
          job: deletedJob,
        });
      } else {
        return res.status(404).json({
          message: "Job not found",
        });
      }
    } catch (error) {
      // Pass any errors to the error handling middleware
      next(error);
    }
  };
}

module.exports = {
  getJobById,
  creatNewJob,
  getFilteredJobs,
  updateJob,
  deleteJob,
};
