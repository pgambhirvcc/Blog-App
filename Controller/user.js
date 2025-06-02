const User = require("../Models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isValidObjectId } = require("../util/util");

// How we register user in mongodb ?
async function registerUser(req, res) {
    // Incoming data from the request
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(500).json({
            message: "Missing values either name, email, password"
        })
    }

    // We are hashing/encrypting password based the password string and the salt value 10 which is the utmost encryption
    const encryptPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = new User({
            name,
            email,
            password: encryptPassword
        })

       const output = await newUser.save();

        return res.status(201).json({
            message: 'Successfully Registered User',
            data: output
        })

    } catch (error) {
        return res.status(500).json({
            message: 'There was an error creating user',
            error
        })
    }
}

async function loginUser(req, res) {
    // Incoming data from the request
    const { email, password } = req.body;

    
    if (!email || !password) {
        return res.status(500).json({
            message: "Missing values either email, password"
        })
    }

    const foundUser = await User.findOne({ email });

    if (foundUser) {
        // proceed further
        const matchPassword = await bcrypt.compare(password, foundUser.password);

        if (matchPassword) {
            // Proceed further

            const accessToken = jwt.sign(
                {
                    name: foundUser.name,
                    email: foundUser.email
                },
                process.env.SECRET_KEY
            );

            return res.status(200).json({
                token: accessToken,
                data: foundUser,
                message: "User succesfully logged in."
            })

        } else {
            return res.status(401).json({
                message: "User credentials incorrect"
            })
        }

    } else {
        return res.status(404).json({
            message: "User doens't exist"
        })
    }
}

async function getAllUsers(req, res) {
    try {
        const allUsers = await User.find();
        const filteredUsersWithoutPassword = allUsers.map((user) => {
            return {
                name: user.name,
                email: user.email,
                id: user._id,
                createdAt: user.createdAt
            }
        }) 

        return res.status(200).json({
            message: "Succesfully fetched users",
            data: filteredUsersWithoutPassword
        })

    } catch (error) {

    }
}

async function getUserById(req, res) {
    const userId = req.params.id;

    if (!isValidObjectId(userId)) {
        return res.status(500).json({
            message: 'Invalid user id'
        })
    }

    const foundUser = await User.findById(userId);

    if (!foundUser) {
        return res.status(404).json({
            message: "User not found"
        })
    
    }

    const filteredUser = {
        name: foundUser.name,
        email: foundUser.email,
        id: foundUser._id,
        createdAt: foundUser.createdAt
    }

    return res.status(200).json({
        message: "User fetched succesfully",
        data: filteredUser
    })

}

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById
}