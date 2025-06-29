const express = require("express");
const router = express.Router();
const {
  createPost,
  getPost,
  getSinglePost,
  editPost,
} = require("../controller/postController");
const upload = require("../middleware/multerConfig");
const isAuth = require("../middleware/isAuth");

router.post("/", upload.single("image"), isAuth, createPost);
router.get("/", getPost);
router.get("/:id",  getSinglePost);
router.put("/:id", isAuth, upload.single("image"), editPost);
module.exports = router;
