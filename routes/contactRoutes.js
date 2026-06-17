const express = require("express");

const router = express.Router();

const {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
} = require("../controllers/contactController");

// Create Contact
router.post("/", createContact);

// Get All Contacts
router.get("/", getAllContacts);

// Get Contact By Id
router.get("/:id", getContactById);

// Delete Contact
router.delete("/:id", deleteContact);

module.exports = router;