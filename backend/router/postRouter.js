const express = require("express");
const router = express.Router();
const {
  createPost,
  getPost,
  getSinglePost,
  editPost,
  deletePost,
} = require("../controller/postController");
const upload = require("../middleware/multerConfig");
const isAuth = require("../middleware/isAuth");

router.post("/", upload.single("image"), isAuth, createPost);
router.get("/", getPost);
router.get("/:id",  getSinglePost);
router.put("/:id", isAuth, upload.single("image"), editPost);
router.delete("/:id", isAuth, upload.single("image"), deletePost);
module.exports = router;
