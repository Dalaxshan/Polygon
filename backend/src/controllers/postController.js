const Post = require('../models/Post');
const { postSchema } = require('../utils/validate');

const createPost = async (req, res) => {
  const { error } = postSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const post = await Post.create(req.body, req.user.id);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const updatePost = async (req, res) => {
  const { error } = postSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.user_id !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });

    const updated = await Post.update(req.params.id, req.body, req.user.id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.user_id !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });

    await Post.delete(req.params.id, req.user.id);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createPost, getPosts, getPost, updatePost, deletePost };