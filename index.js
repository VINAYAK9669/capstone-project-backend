const express = require("express");
const userRoute = require("./routes/userRoute");
const jobRoute = require("./routes/jobRoute");

const PORT = 3000;
const app = express();
app.use(express.json());

const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const verifyToken = require("./middleware/verifyToken");
const errorHandler = require("./middleware/errorHandler");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connnected to mahgoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MagoDb");
  });

app.use("/user", userRoute);
app.use("/job", verifyToken, jobRoute);
app.use(errorHandler); // Error handler should be used after all routes

// localhost:3000/health
app.get("/health", (req, res) => {
  res.json({
    message: "Job listing API is working fine",
    status: "working",
    date: new Date().toLocaleDateString(),
  });
});

app.use;
"*",
  (req, res) => {
    res.status(404).json({ message: "End Point", status: error });
  };

app.listen(PORT, () => {
  console.clear();
  console.log(`Server is running on the port : ${PORT}`);
});
