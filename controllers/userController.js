const User = require("../model/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function handleLogin() {
  return async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        const isPasswordCorrect = await bcrypt.compare(
          password,
          existingUser.password
        );

        if (isPasswordCorrect) {
          //* JSON WEBTOKEN
          const token = jwt.sign(
            { userID: existingUser._id, email: existingUser.email }, // payload: Object to convert to a string/token
            "secret",
            {
              expiresIn: "1h",
            }
          );
          res.status(200).json({
            message: "Login Successful",
            email: existingUser.email,
            token,
          });
        } else {
          res.status(401).json({
            message: "Invalid Credentials",
          });
        }
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    } catch (error) {
      next(error);
    }
  };
}
function handleRegister() {
  return async (req, res, next) => {
    try {
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
    } catch (error) {
      next(error);
    }
  };
}

module.exports = { handleLogin, handleRegister };
