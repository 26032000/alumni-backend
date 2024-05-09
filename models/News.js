const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model('News', NewsSchema);