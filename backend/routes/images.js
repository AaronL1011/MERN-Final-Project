const router = require('express').Router();
const Image = require('../models/Image');
const verify = require('../utils/verify-token');

// Create new Image
router.post('/', verify, async (req, res) => {
  const image = new Image({
    url: req.body.url,
    tags: req.body.tags,
    posts: req.body.posts,
    visibility: req.body.visibility
  });

  try {
    await image.save();
    res.status(200).send(image);
  } catch (error) {
    res.status(500).send('Something went wrong!');
  }
});

// Get all images
router.get('/', async (req, res) => {
  try {
    const images = await Image.find();
    if (images) {
      res.status(200).send(images);
    } else {
      res.status(404).send('Images not found, check ID and try again');
    }
  } catch (error) {
    res.status(500).send('Something went wrong!');
  }
});

// Get image by ID
router.get('/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (image) {
      res.status(200).send(image);
    } else {
      res.status(404).send('Image not found, check ID and try again');
    }
  } catch (error) {
    res.status(500).send('Something went wrong, please try again!');
  }
});

// Update image by ID
router.put('/:id', verify, async (req, res) => {
  await Image.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, image) => {
      if (error) {
        return res.status(500).send(error);
      }
      return res.status(200).json(image);
    }
  ).catch((error) => {
    return res.status(500).send('Something went wrong, please try again!');
  });
});

// Delete image by ID
router.delete('/:id', verify, async (req, res) => {
  await Image.findByIdAndRemove(req.params.id, (error, image) => {
    if (error) {
      return res.status(500).send(error);
    }

    const response = {
      message: 'Image successfully deleted',
      id: image._id
    };

    return res.status(200).json(response);
  }).catch((error) => {
    return res.status(500).send(error);
  });
});

module.exports = router;
