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
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, user) => {
      if (error) {
        return res.status(500).send(error);
      }
      return res.json(user);
    }
  ).catch(error, () => {
    return res.status(500).send(error);
  });
  res.json(updatedUser);
});

// Delete a user by their ID - PRIVATE ROUTE
router.delete('/:id', verify, async (req, res) => {
  try {
    const deletedUser = User.findByIdAndRemove(req.params.id, (error, user) => {
      if (error) {
        return res.status(500).send(error);
      }

      const response = {
        message: 'User successfully deleted',
        id: user._id
      };

      return res.status(200).send(response);
    });
  } catch (error) {
    return res.status(500).send('Server error');
  }
});

module.exports = router;
