const express = require("express");
const router = express.Router();

const validateNewUser = require("../middleware/validateNewUser");
const {
  handleRegister,
  handleLogin,
} = require("../controllers/userController");

router.get("/", (req, res) => {
  res.json({
    message: "User Route is working fine",
    status: "Working",
  });
});
// ! *********** New User Registration *********************
// Need to create a validation middleware (data is missing)
router.post("/register", validateNewUser, handleRegister());

// ! *********** User Login *********************

router.post("/login", handleLogin());

module.exports = router;
