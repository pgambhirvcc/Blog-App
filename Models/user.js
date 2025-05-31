// Schema for User Model

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema);

module.exports = User;