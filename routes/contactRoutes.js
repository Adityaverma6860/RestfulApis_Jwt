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


//  Apply token validation middleware to all routes

router.use(validateToken);

//  Routes for getting all contacts and creating a new one
router.route("/").get(getContact).post(createContact);

//  Routes for specific contact operations (by ID)
router.route("/:id").get(getContacts).put(updateContact).delete(deleteContact);

module.exports = router;
