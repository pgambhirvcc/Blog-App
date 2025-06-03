const jwt = require('jsonwebtoken');
const Blog = require('../Models/blog');
const User = require('../Models/user');

async function createBlog(req, res) {
    const blogInfoToBeCreated = req.body;
    const title = blogInfoToBeCreated.title;
    const image = blogInfoToBeCreated.image;

    if (!title || !image) {
        return res.status(500).json({
            message: 'Blog title or Image is missing'
        })
    }

    try {
        const newBlog = new Blog({
            title,
            image,
            description: req.body.description,
            author: foundUser._id
        })

       const output = await newBlog.save();

        return res.status(201).json({
            message: 'Successfully Created blog',
            data: output
        })

    } catch (error) {
        return res.status(500).json({
            message: 'There was an error creating blog',
            error
        })
    }

}

async function GetAllBlogs(req, res) {
    const allBlogs = await Blog.find();

    return res.status(200).json({
        message: 'Succesfully fetched all blogs',
        data: allBlogs
    })
}

module.exports = {
    createBlog,
    GetAllBlogs
}