const express = require("express");
const router = express.Router();
const { createPost, getPost } = require("../controller/postController");
const upload = require('../middleware/multerConfig');

router.post("/",upload.single('image'), createPost);
router.get("/", getPost);
module.exports = router;
