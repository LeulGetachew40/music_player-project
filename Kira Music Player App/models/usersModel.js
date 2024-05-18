const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  musicInterests: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Music",
      required: [true, "Everyone has a song they like :)"],
    },
  ],
});
const User = mongoose.model("User", userSchema);

module.exports = User;
