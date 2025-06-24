const Post = require("../model/postModel");
exports.createPost = async (req, res, next) => {
  const { title, summary, description, image } = req.body;
  try {
    if (!title || !summary) {
      return res
        .status(400)
        .json({
          message: "Please provide content for all required input fields.",
        });
    }
    const newPost = await Post.create({
      title,
      summary,
      description,
      image,
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
    const post = await Post.find();
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
