const express = require('express');
const Router = express.Router();
const BlogController = require('../Controller/blog');

// Create Blog API 
Router.post('/create', BlogController.createBlog)

module.exports = Router;