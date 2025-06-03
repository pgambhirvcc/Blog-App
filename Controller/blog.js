const jwt = require('jsonwebtoken');
const Blog = require('../Models/blog');
const User = require('../Models/user');
const { isValidObjectId } = require('../util/util');

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
    const allBlogs = await Blog.find().populate({
        path: 'author'
    });

    return res.status(200).json({
        message: 'Succesfully fetched all blogs',
        data: allBlogs
    })
}

async function DeleteBlog(req, res) {
    const blogId = req.params.id;

    if (!isValidObjectId(blogId)) {
        return res.status(500).json({
            message: 'Invalid blog id'
        })
    }

    try {
        const isDeleted = await Blog.findByIdAndDelete(blogId);
        if (isDeleted) {
            return res.status(200).json({
                message: "Blog succesfully deleted"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
}

module.exports = {
    createBlog,
    GetAllBlogs,
    DeleteBlog
}