const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
  title: String,
  artist: String,
  datePublished: { type: Date },
  address: String,
});

const musicModel = mongoose.model("Music", musicSchema);

module.exports = musicModel;
