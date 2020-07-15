const router = require('express').Router();
const verify = require('../utils/verify-token');
const Post = require('../models/post');

// Get all posts - PUBLIC ROUTE
router.get('/', async (req, res) => {
  const posts = await Post.find();
  res.status(200).send(posts);
});

module.exports = router;
