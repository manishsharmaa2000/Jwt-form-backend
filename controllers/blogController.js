const Blog = require("../models/Blog");
const cloudinary = require("../config/cloudnary");

// CREATE BLOG 

exports.createBlog = async (req, res) => {
  try {
    const { heading, title, disc } = req.body;

    let imageUrl = "";

    if (req.file) {
      const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
        "base64"
      )}`;

      const uploadRes = await cloudinary.uploader.upload(fileStr, {
        folder: "blogs",
      });

      imageUrl = uploadRes.secure_url;
    }

    const blog = await Blog.create({
      heading,
      title,
      disc,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      blog,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET BLOGS 

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({
      createdAt: -1,
    });

    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//  UPDATE BLOG 

exports.updateBlog = async (req, res) => {
  try {
    const { heading, title, disc } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    let imageUrl = blog.image;

    if (req.file) {
      const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
        "base64"
      )}`;

      const uploadRes = await cloudinary.uploader.upload(fileStr, {
        folder: "blogs",
      });

      imageUrl = uploadRes.secure_url;
    }

    blog.heading = heading;
    blog.title = title;
    blog.disc = disc;
    blog.image = imageUrl;

    await blog.save();

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//  DELETE BLOG 

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//  HIDE / UNHIDE 

exports.hideBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.isHidden = !blog.isHidden;

    await blog.save();

    res.status(200).json({
      success: true,
      isHidden: blog.isHidden,
      message: blog.isHidden
        ? "Blog Hidden"
        : "Blog Visible",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};