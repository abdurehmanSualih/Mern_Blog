const express = require('express');
const router = express.Router();
const {createPost, getPost } = require('../controller/postController')

router.post('/',createPost);
router.get('/',getPost);
module.exports = router;