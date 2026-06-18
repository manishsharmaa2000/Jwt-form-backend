const express = require("express");

const router = express.Router();

const {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  hideContact
} = require("../controllers/contactController");

router.post("/", createContact);
router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.put("/update/:id", updateContact);
router.delete("/delete/:id", deleteContact);
router.put("/hide/:id", hideContact);

module.exports = router;