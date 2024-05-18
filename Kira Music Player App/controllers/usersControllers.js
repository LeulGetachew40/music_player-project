const User = require("./../models/usersModel.js");
async function createUser(req, res, next) {
  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
  });
  res.status(201).json({ user: newUser });
}

module.exports = {
  createUser,
};
