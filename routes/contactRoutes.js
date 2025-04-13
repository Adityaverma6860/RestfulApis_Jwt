// const express = require("express");
// const router = express.Router();
// // const {getContact} = require("../controllers/contactController");
// const { getContact,createContact,
// updateContact,deleteContact,getContacts } = require("../controller/contactController");

// const contactController = require('../controller/contactController');

// // router.route("/").get(getContact);
// // router.route("/").post(createContact);
// // router.route("/id").get(getContacts);
// // router.route("/id").put(updateContact);
// // router.route("/:id").delete(deleteContact);

// // router.route("/").get(getContact).post(createContact);
// // router.route("/:id").delete(deleteContact).put(updateContact).get(getContacts);

// // Validate Token for All routes
// const validateToken = require("../middleware/validateTokenHandler");
// router.use(validateToken);

// router.route("/").get(getContact).post(createContact);
// router.route("/:id").delete(deleteContact).put(updateContact).get(getContacts);

// module.exports = router;


const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler"); 

const {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getContacts,
} = require("../controller/contactController");

// const validateToken = require("../middleware/validateTokenHandler");

//  Apply token validation middleware to all routes
router.use(validateToken);

//  Routes for getting all contacts and creating a new one
router.route("/").get(getContact).post(createContact);

//  Routes for specific contact operations (by ID)
router.route("/:id").get(getContacts).put(updateContact).delete(deleteContact);

module.exports = router;
