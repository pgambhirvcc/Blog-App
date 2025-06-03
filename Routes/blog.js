const express = require('express');
const Router = express.Router();
const BlogController = require('../Controller/blog');
const { validateToken } = require('../Middleware/validate');

// Create Blog API 
Router.post('/create', validateToken, BlogController.createBlog)

Router.get('/all', validateToken, BlogController.GetAllBlogs);

Router.delete('/:id', validateToken, BlogController.DeleteBlog);

module.exports = Router;