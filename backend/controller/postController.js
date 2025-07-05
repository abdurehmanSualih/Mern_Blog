const fs = require("fs");
const path = require("path");

const Post = require("../model/postModel");
exports.createPost = async (req, res, next) => {
  const { title, summary, description } = req.body;
  const image = `/images/${req.file.filename}`;
  try {
    if (!title || !summary) {
      return res.status(400).json({
        message: "Please provide content for all required input fields.",
      });
    }
    const newPost = await Post.create({
      title,
      summary,
      description,
      image,
      user: req.user.id,
    });
    res.status(201).json({
      message: "Post created successfully.",
      post: newPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create a post.",
      error: error.message,
    });
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.find().populate("user", "userName");
    if (!post) {
      res.status(404).json("post not found!");
    }
    res.status(200).json({
      post,
      message: "Post fetched.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSinglePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("user", "userName");
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.editPost = async (req, res, next) => {
  const { id } = req.params;
  const { title, summary, description } = req.body;
  const image = req.file ? `/images/${req.file.filename}` : null;

  const updateData = {
    ...(title && { title }),
    ...(summary && { summary }),
    ...(description && { description }),
    ...(image && { image }),
  };

  try {
    const existingPost = await Post.findById(id);
    if (image && existingPost.image) {
      clearImage(existingPost.image);
    }
    const updatedPost = await Post.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    clearImage(deletedPost.image);
    res.status(200).json({ message: "Post deleted", post: deletedPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
