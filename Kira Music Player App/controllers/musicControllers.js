const Music = require("./../models/musicModel.js");
const catchAsync = require("./../utils/catchAsync.js");

const addMusic = catchAsync(async (req, res, next) => {
  const newMusic = await Music.create({
    title: req.body.title,
    artist: req.body.artist,
    datePublished: req.body.datePublished,
    address: req.body.address,
  });
  res.status(201).json({
    status: "success",
    newMusic,
  });
});

const deleteMusic = catchAsync(async (req, res, next) => {});

module.exports = { addMusic, deleteMusic };
