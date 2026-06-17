const Contact = require("../models/Contact");

// Create Contact
const createContact = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      website,
      address,
      city,
      state,
      country,
      postalCode,
      link,
    } = req.body;

    // Validation Regex
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex =
      /^[0-9]{10}$/;

    const postalRegex =
      /^[0-9]{5,6}$/;

    const urlRegex =
      /^(https?:\/\/)?([\w\-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;

    // Required Fields Validation
    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !country ||
      !postalCode
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All required fields must be filled",
      });
    }

    // Email Validation
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email Address",
      });
    }

    // Phone Validation
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message:
          "Phone Number must be 10 digits",
      });
    }

    // Postal Code Validation
    if (!postalRegex.test(postalCode)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Postal Code",
      });
    }

    // Website Validation
    if (
      website &&
      !urlRegex.test(website)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Website URL",
      });
    }

    // Social Link Validation
    if (
      link &&
      !urlRegex.test(link)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Social Link",
      });
    }

    const contact =
      await Contact.create({
        name,
        email,
        phone,
        website,
        address,
        city,
        state,
        country,
        postalCode,
        link,
      });

    res.status(201).json({
      success: true,
      message:
        "Contact Saved Successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Contacts
const getAllContacts = async (
  req,
  res
) => {
  try {
    const contacts =
      await Contact.find().sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Contact By Id
const getContactById = async (
  req,
  res
) => {
  try {
    const contact =
      await Contact.findById(
        req.params.id
      );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message:
          "Contact Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Contact
const deleteContact = async (
  req,
  res
) => {
  try {
    const contact =
      await Contact.findByIdAndDelete(
        req.params.id
      );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message:
          "Contact Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Contact Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
};