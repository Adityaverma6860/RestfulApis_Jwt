// // Ye file  Crud ke baad ka hai
// const asyncHandler = require("express-async-handler");
// const bcrypt = require("bcrypt");
// const User = require("../models/userModel");
// const jwt = require("jsonwebtoken");

// // @desc Register a user/register
// // @route Get /api/contacts
// //@ access public

// //  const registerUser= asyncHandler(async (req, res) => {
// //
// //    const { username ,email,password} = req.body;   // Destructing
// //     res.json({message:"Register the user"});
// // });

// // User Registration & Password Hashing

// const registerUser = asyncHandler(async (req, res) => {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     res.status(400);
//     throw new Error("All fields are mandatory!");
//   }

//   const userAvailable = await User.findOne({ email });

//   if (userAvailable) {
//     res.status(400);
//     throw new Error("User already registered!");
//   }

//   // Hash password
//   const hashedPassword = await bcrypt.hash(password, 10);
//   console.log("Hashed Password: ", hashedPassword);

//   // Create user
//   const user = await User.create({
//     username,
//     email,
//     password: hashedPassword,
//   });

//   console.log(`User created: ${user}`);

//   if (user) {
//     res.status(201).json({ _id: user.id, email: user.email });
//   } else {
//     res.status(400);
//     throw new Error("User data is not valid");
//   }

//   res.json({ message: "Register the user" });
// });

// // @desc Login user
// // @route Post /api/users/Login
// //@ access public

// // const loginUser= asyncHandler(async (req, res) => {
// //     res.json({message:"Register the user"});
// // });

// // JWT Access Token & User Login

// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     res.status(400);
//     throw new Error("All fields are mandatory!");
//   }

//   const user = await User.findOne({ email });

//   //      VeryfyPassword
//   // Compare password with hashed password
//   if (user && (await bcrypt.compare(password, user.password))) {
//     const accessToken = jwt.sign(
//       {
//         user: {
//           username: user.username,
//           email: user.email,
//           id: user.id,
//         },
//       },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: "10m" }
//     );

//     res.status(200).json({ accessToken });
//   } else {
//     res.status(400);
//     throw new Error("Invalid email or password!");
//   }

//   res.json({ message: "Login user!" });
// });

// // @desc Current user info
// // @route Post /api/users/Login
// //@ access private

// const currentUser = asyncHandler(async (req, res) => {
//   //    res.json({message:"Current user information"});
//   res.json(req.user);
// });

// module.exports = { registerUser, loginUser, currentUser };




// Ye file CRUD ke baad ka hai

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
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

  if (user) {
    return res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

// @desc    Login a user
// @route   POST /api/users/login
// @access  Public
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
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
