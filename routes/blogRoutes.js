const express = require("express");
const router = express.Router();

const upload = require("../middleware/multerMiddleware");

const {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  hideBlog,
} = require("../controllers/blogController");

// Create
router.post(
  "/create",
  upload.single("image"),
  createBlog
);

// Get All
router.get("/all", getBlogs);

// Update
router.put(
  "/update/:id",
  upload.single("image"),
  updateBlog
);

// Delete
router.delete(
  "/delete/:id",
  deleteBlog
);

// Hide / Unhide
router.put(
  "/hide/:id",
  hideBlog
);

module.exports = router;