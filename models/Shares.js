const mongoose = require('mongoose');

// Define the schema for shares
const shareSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true 
  },
  description: {
    type: String,
  },
  totalQuantity: {
    type: Number,
    required: true
  },
  currentPrice: {
    type: Number,
    required: true
  },
  
  
});


const Share = mongoose.model('Share', shareSchema);

module.exports = Share;
