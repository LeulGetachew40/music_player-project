const catchAsync = require("../utils/catchAsync.js");
const User = require("./../models/usersModel.js");
const createUser = catchAsync(async function (req, res, next) {
  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
  });
  res.status(201).json({ user: newUser });
});
const getHomePage = catchAsync(async function (req, res, next) {
  console.log(req.user);
  res.status(200).render("profile", { user: req.user });
});

const getAllUsers = catchAsync(async function (req, res, next) {
  const allUsers = await User.find().populate("musicInterests");
  console.log(User.find().populate("musicInterests").getQuery());
  res.status(200).json({ allUsers });
});

const getUserAllSongs = catchAsync(async function (req, res, next) {
  const user = await User.findOne({ username: req.user.username }).populate(
    "musicInterests"
  );
  const songs = user.musicInterests;
  res.status(200).json({ songs });
});

module.exports = {
  createUser,
  getHomePage,
  getAllUsers,
  getUserAllSongs,
};
