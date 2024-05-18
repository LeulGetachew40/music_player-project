const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
  title: String,
  datePublished: Date,
  address: String,
});

const musicModel = mongoose.model("Music", musicSchema);

module.exports = musicModel;
