const router = require('express').Router();
const User = require('../models/User');
const verify = require('../utils/verify-token');

// Get all users
router.get('/', async (req, res) => {
  try {
    users = await User.find();
    if (!users) {
      return res.status(400).send('Unable to find users.');
    }
  } catch (error) {
    return res.status(500).send('Server error');
  }
  res.json(users);
});

// Get a user by id
router.get('/:id', async (req, res) => {
  try {
    user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).send('User not found');
    }
  } catch (error) {
    return res.status(500).send('Server error');
  }
  res.json(user);
});

// Update user information - PRIVATE ROUTE
router.put('/:id', verify, async (req, res) => {
  if (req.user._id === req.params.id) {
    await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (error, user) => {
        if (error) {
          return res.status(500).send(error);
        }
        return res.status(200).json(user);
      }
    ).catch((error) => {
      return res.status(500).send(error);
    });
  } else {
    return res.status(402).send('Unauthorized');
  }
});

// Delete a user by their ID - PRIVATE ROUTE
router.delete('/:id', verify, async (req, res) => {
  if (req.user._id === req.params.id) {
    try {
      await User.findByIdAndRemove(req.params.id)
        .then((user) => {
          const response = {
            message: 'User successfully deleted',
            id: user._id
          };

          return res.status(200).json(response);
        })
        .catch(() => {
          return res
            .status(404)
            .send('This user doesnt exist, please check and try again.');
        });
    } catch (error) {
      res.status(500).send('Internal server error.');
    }
  } else {
    return res.status(402).send('Unauthorized');
  }
});

module.exports = router;
