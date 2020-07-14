const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  tags: {
    type: [String]
  },
  posts: {
    type: [String],
    required: true
  },
  visibility: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Images', UserSchema);
