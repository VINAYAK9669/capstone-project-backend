const mangoose = require("mongoose");

// name, email, password
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String, // can also use regex to parse or validate mail
    required: true,
    unique: true,
  },
});

module.export = mangoose.model("user", userSchema);