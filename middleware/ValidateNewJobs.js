const validateNewJobs = (req, res, next) => {
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
  } = req.body;

  // Check if all required fields are present
  if (
    !companyName ||
    !logoURL ||
    !jobTitle ||
    !monthlySalary ||
    !jobType ||
    typeof remote !== "boolean" ||
    !location ||
    !jobDescription ||
    !aboutCompany ||
    !skillsRequired
  ) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }

  // Validate the job position
  const validJobPositions = ["Full-Time", "Part-Time", "Internship"];
  const isValidJobType = validJobPositions.includes(jobType);

  // Validate the skillsRequired array
  const isValidSkills =
    Array.isArray(skillsRequired) &&
    skillsRequired.every((skill) => typeof skill === "string");

  // Validate the monthly salary
  const isValidMonthlySalary =
    typeof monthlySalary === "number" && monthlySalary > 0;

  // Validate the logo URL
  const image_url_pattern = new RegExp(
    "^(https?:\\/\\/)" + // URL scheme (http or https)
      "([\\da-z.-]+)\\.([a-z.]{2,6})" + // Domain name and extension
      "([\\/\\w .-]*)*" + // Path
      "(\\?.*)?$" // Query string (optional)
  );

  function isValidImageUrl(url) {
    return image_url_pattern.test(url);
  }

  const validLogoUrl = isValidImageUrl(logoURL);

  // If any validation fails, return a 400 error
  if (
    !isValidSkills ||
    !isValidMonthlySalary ||
    !isValidJobType ||
    !validLogoUrl
  ) {
    return res.status(400).json({
      message: "Please validate all the required field",
    });
  }

  // Proceed to the next middleware if all validations pass
  next();
};

module.exports = validateNewJobs;
