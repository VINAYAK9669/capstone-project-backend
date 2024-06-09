const express = require("express");
const router = express.Router();
const User = require("../model/Users");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.json({
    message: "User Route is working fine",
    status: "Working",
  });
});
// ! *********** New User Registration *********************
// Need to create a validation middleware (data is missing)
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // * email is the unique key by which we can get to know the user is exists or not
  const existingUser = await User.findOne({ email });
  // TODO: Case 1- If user is already exists
  if (existingUser) {
    return res.status(400).json({
      message: "User already exists, please use another email address",
    });
  } else {
    // TODO: Case 2- If user is not exists

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save(); //Saves the new user document to the database

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  }
});

// ! *********** User Login *********************

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (isPasswordCorrect) {
        res.status(200).json({
          message: "Login Successful",
          user: existingUser,
        });
      }
    } else {
      res.status(404).json({
        message: "User not found or invalid password",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
});

module.exports = router;
