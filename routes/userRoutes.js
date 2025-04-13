// //  yaha Ek Saath saare code hai Crud ke liye s
// const { registerUser, currentUser,loginUser } = require("../controller/userController");
// const userController = require('../controller/userController');

// const express = require(express);

// const router = express.Router();

// // router.post("/register",(req,res)=>{
// //     res.json({message:"Register the user"});
// // });

// // Yaha ke baad kisi or file se import huaa hai 
// router.post("/register",registerUser)

// // router.post("/login",(req,res)=>{
// //     res.json({message:"Login user"});
// // });

// router.post("/login",loginUser);

// // router.get("/current",(req,res)=>{
// //     res.json({message:"Current user information"});
// // });

// // if want to Validate some of the routes than used as 
// router.get("/current",validateToken,currentUser)


// module.exports = router;





const express = require("express");
const router = express.Router();

const { registerUser, currentUser, loginUser } = require("../controller/userController");
const validateToken = require("../middleware/validateTokenHandler"); // Assuming you have a token validation middleware

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get current logged-in user (protected route)
router.get("/current", validateToken, currentUser);

module.exports = router;
