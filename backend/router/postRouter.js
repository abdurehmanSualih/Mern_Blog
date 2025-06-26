const express = require("express");
const router = express.Router();
const {
  createPost,
  getPost,
  getSinglePost,
} = require("../controller/postController");
const upload = require("../middleware/multerConfig");

router.post("/", upload.single("image"), createPost);
router.get("/", getPost);
router.get("/:id", getSinglePost);
module.exports = router;
