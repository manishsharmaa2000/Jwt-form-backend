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
      error: err.message,
    });
  }
};

// GET ALL BLOGS
exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
};

// DELETE BLOG
exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};

// UPDATE BLOG
exports.updateBlog = async (req, res) => {
  const updated = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
};