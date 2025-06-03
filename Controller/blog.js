const jwt = require('jsonwebtoken');
const Blog = require('../Models/blog');
const User = require('../Models/user');

async function createBlog(req, res) {
    const allHeaders = req.headers;
    const token = allHeaders.authorization;

    if (!token) {
        return res.status(401).json({
            message: "You are not authorized to create a blog"
        })
    }

    const decodedToken = jwt.decode(token, { complete: true })
    
    if (!decodedToken) {
        return res.status(401).json({
            message: "You are not authorized to create a blog"
        })
    }

    const userEmailFromToken = decodedToken.payload.email;
    const foundUser = await User.findOne({ email: userEmailFromToken });
    
    if (!foundUser) {
        return res.status(401).json({
            message: "You are not authorized to create a blog"
        })
    }

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

module.exports = {
    createBlog
}