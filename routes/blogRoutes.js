const express = require("express");
const router = express.Router();

const multer = require("../middleware/multerMiddleware");
const controller = require("../controllers/blogController");

router.post("/create", multer.single("image"), controller.createBlog);
router.get("/all", controller.getBlogs);
router.delete("/:id", controller.deleteBlog);
router.put("/:id", controller.updateBlog);

module.exports = router;