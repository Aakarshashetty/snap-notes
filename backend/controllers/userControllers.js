const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToke = require("../utils/generateToke");

const registerUser = async (req, res) => {
  const { name, email, password, pic } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(404);
    throw new Error("User Already Exists.");
  }

  const user = await User.create({ name, email, password, pic });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToke(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Unable to create user!");
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      isAdmin: user.isAdmin,
      token: generateToke(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials!");
  }
};
module.exports = { registerUser, authUser };
