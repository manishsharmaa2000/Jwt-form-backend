const express = require("express");

const router = express.Router();

const {
    createUser,
    getUsers,
    deleteUser
} = require("../controllers/userController");


// Create User
router.post(
    "/createuser",
    createUser
);

// Get Users
router.get(
    "/users",
    getUsers
);

// Delete User
router.delete(
    "/deleteuser/:id",
    deleteUser
);

module.exports = router;