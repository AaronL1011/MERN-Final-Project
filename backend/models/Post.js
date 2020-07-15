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
    type: [Object]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Posts', PostSchema);
