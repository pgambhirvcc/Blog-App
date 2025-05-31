const User = require("../Models/user");
const bcrypt = require('bcryptjs');

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

module.exports = {
    registerUser
}