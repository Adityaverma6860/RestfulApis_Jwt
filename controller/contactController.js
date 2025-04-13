// //CRUD - Yaha ek Sath saare route Call huaa hai 
// const asyncHandler = require('express-async-handler');
// const Contact = require("../models/contactModel");

//  // @desc Get all contacts 
// // @route Get /api/contacts 
// //@access public /Private  

//  const getContact = asyncHandler(async (req, res) => {
//   // res.status(200).json({ message: "Get all contacts" });
//   // 2
//   // const contact = await Contact.find();
//    // Ye Add huaa hai 
//   const contact = await Contact.find({user_id:req.user.id});
//   res.status(200).json({ Contact });
// });

// // @desc Create New contact 
// // @route Post /api/contact
// //@ access public /Private
 
// const createContact = asyncHandler(async (req, res) => {
//   console.log("The request body is :", req.body);
//   const { name, email, phone } = req.body;
//   if (!name || email || phone) {
//     res.status(400);
//     throw new Error("All fields are mandatory !");
//   }
//   // res.status(201).json({ message: " Create contacts" });
//   //2
//   const contact = await Contact.create({
//     name,
//     email,
//     phone,
//     user_id: req.user.id
//   });
//   res.status(201).json({ contact });
// });

// // @desc Get Contacts 
// // @route Get/api/contacts:id
// // @access public 
 
// const getContacts = asyncHandler(async (req, res) => {
//   // res.status(200).json({ m essage: `Get  contacts for ${req.params.id}` });
//   // 2
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(404);
//     throw new Error("Contact not Found");
//   } 
//   res.status(200).json(contact);
// });
// // @desc Update Contact 
// // @route Put/api/contacts:id
// // @access public 
// const updateContact = asyncHandler(async (req, res) => {
//   // res.status(200).json({ message: `Update contacts for ${req.params.id}` });
//   // 2
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(404);
//     throw new Error("Contact not Found");
//   }
//   if(contact.user_id.toString() != req.user.id) {
//      res.status(403);
//      throw new Error("User don't have permission to update user contact");
//   }
//   const updateContact = await Contact.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );
//   res.status(200).json(updateContact);
// });
// // @desc Delete Contact 
// // @route Delete/api/contacts:id
// // @access public 
// const deleteContact = asyncHandler(async (req, res) => {
//   // res.status(200).json({ message: `Delete contacts for ${req.params.id}` });
//   // 2
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(404);
//     throw new Error("Contact not Found");
//   }
//   // await Contact.remove();
//   await Contact.deleteOne({_id: req.params.id});
//   res.status(200).json(contact);
// });
// module.exports = {
//   getContact,
//   createContact,
//   updateContact,
//   deleteContact,
//   getContacts,
// };


const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactModel");

// @desc    Get all contacts for a user
// @route   GET /api/contacts
// @access  Private
const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json({ contacts });
});

// @desc    Create a new contact
// @route   POST /api/contacts
// @access  Private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  

  res.status(201).json({ contact });
});

// @desc    Get a single contact
// @route   GET /api/contacts/:id
// @access  Private
const getContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json(contact);
});

// @desc    Update a contact
// @route   PUT /api/contacts/:id
// @access  Private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User does not have permission to update this contact");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

// @desc    Delete a contact
// @route   DELETE /api/contacts/:id
// @access  Private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  await Contact.deleteOne({ _id: req.params.id });

  res.status(200).json({ message: "Contact deleted", contact });
});

module.exports = {
  getContact,
  createContact,
  getContacts,
  updateContact,
  deleteContact,
};

