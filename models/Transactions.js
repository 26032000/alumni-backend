const mongoose = require('mongoose');

// Define the schema for transactions
const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['loan', 'deposit', 'withdrawal', 'share'],
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
}, { timestamps: true });

// Create a model using the transaction schema
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
