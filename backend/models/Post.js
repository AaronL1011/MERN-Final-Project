const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  caption: {
    type: String
  },
  tags: {
    type: [String]
  },
  images: {
    type: [String],
    required: true
  },
  comments: {
    userID: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Posts', PostSchema);
