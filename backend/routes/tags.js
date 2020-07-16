const router = require('express').Router();
const Tag = require('../models/Tag');
const verify = require('../utils/verify-token');

// Create new Tag
router.post('/', verify, async (req, res) => {
  const tagExists = await Tag.find({ tag: req.body.tag.toLowerCase() }).exec();
  console.log(tagExists);
  if (tagExists.length > 0) {
    return res
      .status(400)
      .send('Tag already exists, please choose another name');
  }
  const tag = new Tag({
    tag: req.body.tag.toLowerCase(),
    posts: req.body.posts,
    images: req.body.images
  });

  try {
    await tag.save();
    return res.status(200).send(tag);
  } catch (error) {
    return res.status(500).send('Something went wrong!');
  }
});

// Get all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find();
    if (tags) {
      return res.status(200).send(tags);
    } else {
      return res.status(404).send('Tags not found, check and try again');
    }
  } catch (error) {
    return res.status(500).send('Something went wrong!');
  }
});

// Get tag by name
router.get('/:tagName', async (req, res) => {
  try {
    const tag = await Tag.find({ tag: req.params.tagName.toLowerCase() });
    if (tag) {
      return res.status(200).send(tag);
    } else {
      return res.status(404).send('Tag not found, check name and try again');
    }
  } catch (error) {
    return res.status(500).send('Something went wrong, please try again!');
  }
});

// Update tag by name
router.put('/:tagName', verify, async (req, res) => {
  try {
    const tagsByName = await Tag.find({
      tag: req.params.tagName.toLowerCase()
    });
    if (tagsByName.length === 0) {
      return res
        .status(404)
        .send('Tag does not exist, please check the name and try again');
    }
    await Tag.findByIdAndUpdate(
      tagsByName[0]._id,
      req.body,
      { new: true },
      (error, tag) => {
        if (error) {
          return res.status(404).send(error);
        }
        return res.status(200).json(tag);
      }
    ).catch((error) => {
      return res.status(500).send(error);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong, please try again!');
  }
});

// Delete tag by ID
router.delete('/:id', verify, async (req, res) => {
  await Tag.findByIdAndRemove(req.params.id, (error, tag) => {
    if (error) {
      return res.status(500).send(error);
    }

    const response = {
      message: 'Tag successfully deleted',
      id: tag._id
    };

    return res.status(200).json(response);
  }).catch((error) => {
    return res.status(500).send(error);
  });
});

module.exports = router;
