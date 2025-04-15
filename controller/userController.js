
// Ye file CRUD ke baad ka hai

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public

    // http://localhost:5000/api/users/register/   yaha email password ,username

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
 
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already registered!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return res.status(201).json({ _id: user.id, email: user.email });
});

// @desc    Login a user
// @route   POST /api/users/login
// @access  Public
// http://localhost:5000/api/users/login/    yaha email and password 

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );

    return res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Invalid email or password!");
  }
});

// @desc    Get current user info
// @route   GET /api/users/current
// @access  Private

// http://localhost:5000/api/users/current/
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
