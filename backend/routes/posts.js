const router = require('express').Router();
const verify = require('../utils/verify-token');
const Post = require('../models/Post');
const User = require('../models/User');

// Get all posts - PUBLIC ROUTE
router.get('/', async (req, res) => {
  const posts = await Post.find().catch((error) => {
    if (error) {
      return res
        .status(400)
        .send('Something went wrong, please refresh and try again');
    }
  });
  res.status(200).send(posts);
});

// Get a post - PUBLIC ROUTE
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id).catch((error) => {
    if (error) {
      return res
        .status(404)
        .send('This post doesnt exist. Please check and try again.');
    }
  });

  res.status(200).send(post);
});

// Create a post - PRIVATE ROUTE
router.post('/', verify, async (req, res) => {
  const post = new Post({
    images: req.body.images,
    caption: req.body.caption,
    tags: req.body.tags
  });
  const current_user = await User.findById(req.user._id);

  try {
    await post.save();
    await current_user.update({ posts: [post._id, ...current_user.posts] });
    res.status(200).send('Post created and saved to User');
  } catch (error) {
    if (error) {
      res.status(500).send('Server error');
      console.log(error);
    }
  }
});

module.exports = router;
