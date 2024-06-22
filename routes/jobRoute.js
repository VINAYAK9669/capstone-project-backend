const express = require("express");
const router = express.Router();

const validateNewJobs = require("../middleware/ValidateNewJobs");
const errorHandler = require("../middleware/errorHandler");
const {
  creatNewJob,
  getFilteredJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const verifyToken = require("../middleware/verifyToken");

// Route for adding a new job
router.post("/add", verifyToken, validateNewJobs, creatNewJob());

// Route for fetching all jobs
router.get("/", verifyToken, getFilteredJobs);

// Route for fetching a job by ID
router.get("/:id", getJobById());

// Route for updating a job by ID
router.put("/:id", verifyToken, updateJob());

// Route for deleting a job by ID
router.delete("/:id", verifyToken, deleteJob());

// Error handling middleware should be the last middleware
router.use(errorHandler);

module.exports = router;
