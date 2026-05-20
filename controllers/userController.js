const User = require("../models/RegisterUser");

const bcrypt = require("bcryptjs");


// Create User
const createUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            phone
        } = req.body;

        // Existing User
        const existingUser =
            await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "User Already Exists"
            });
        }

        // Hash Password
        const hashedPassword =
            await bcrypt.hash(password, 10);

        // Create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone
        });

        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            user
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Get Users
const getUsers = async (req, res) => {

    try {

        const users = await User.find();

        res.status(200).json({
            success: true,
            users
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Delete User
const deleteUser = async (req, res) => {

    try {

        await User.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "User Deleted Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = {
    createUser,
    getUsers,
    deleteUser
};