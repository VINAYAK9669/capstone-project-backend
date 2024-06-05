const express = require("express");
const PORT = 3000;
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connnected to mahgoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MagoDb");
  });
// localhost:3000/health
app.get("/health", (req, res) => {
  // res.send,
  // res.json,
  // res.sendFile,
  // res.render;

  res.json({
    message: "Job listing API is working fine",
    status: working,
    date: new Date().toLocaleDateString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on the port : ${PORT}`);
});
