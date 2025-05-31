const express = require('express');
const router = express.Router();
const UserController = require('../Controller/user');

router.post('/register', UserController.registerUser);

router.post('/login', UserController.loginUser);

// API --> app.js (It is smart enough where to route) --> USer routes (smart enough what purpose) --> controller(registerUser)

module.exports = router;