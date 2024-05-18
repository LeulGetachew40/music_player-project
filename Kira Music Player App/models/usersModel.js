const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  musicInterests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Music" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
