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
  // TODO - Implement logic to upload an array of images, create Image objects with the returned URLS, and
  // create Post object with the Id's of the newly created Image objects.

  const post = new Post({
    images: req.body.images,
    caption: req.body.caption,
    tags: req.body.tags
  });

  const current_user = await User.findById(req.user._id);

  try {
    await post.save();
    await current_user.update({ posts: [post._id, ...current_user.posts] });
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send('Something went wrong, please try again!');
    console.log(error);
  }
});

// Update post information - PRIVATE ROUTE
router.put('/:id', verify, async (req, res) => {
  const current_user = await User.findById(req.user._id);

  if (current_user.posts.includes(req.params.id)) {
    await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (error, post) => {
        if (error) {
          return res.status(500).send(error);
        }
        return res.status(200).json(post);
      }
    ).catch((error) => {
      return res.status(500).send(error);
    });
  } else {
    return res.status(401).send('Only the post author can make changes!');
  }
});

// Delete a post - PRIVATE ROUTE
router.delete('/:id', verify, async (req, res) => {
  const current_user = await User.findById(req.user._id);

  if (current_user.posts.includes(req.params.id)) {
    try {
      await Post.findByIdAndRemove(req.params.id)
        .then((post) => {
          const response = {
            message: 'Post successfully deleted',
            id: post._id
          };

          return res.status(200).json(response);
        })
        .catch(() => {
          return res
            .status(404)
            .send('This post doesnt exist, please check and try again.');
        });
    } catch (error) {
      res.status(500).send('Internal server error.');
    }
  } else {
    return res
      .status(401)
      .send('Either you are not authorized, or this post doesnt exist.');
  }
});

module.exports = router;
