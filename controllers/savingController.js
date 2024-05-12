const Saving = require('../models/Saving');
const User = require('../models/User');
const Transaction = require('../models/Transactions');

// Deposit savings
exports.depositSavings = async (req, res) => {
  try {
    // Get user ID from request body
    const { userId } = req.body;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get amount from request body
    const { amount } = req.body;

    // Create a new saving object
    const newSaving = new Saving({
      user: user._id,
      amount,
    });

    // Save the new saving object
    await newSaving.save();

    // Create transaction record
    const transaction = new Transaction({
      type: 'deposit',
      userId: user._id,
      amount,
      description: 'Deposit to savings',
    });
    await transaction.save();

    // Return success response
    res.status(201).json({ message: 'Savings deposited successfully', saving: newSaving });
  } catch (error) {
    console.error('Failed to deposit savings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all savings
exports.getSavings = async (req, res) => {
  try {
    // Find all savings
    const savings = await Saving.find();
    res.status(200).json({ message: 'Savings retrieved successfully', savings });
  } catch (error) {
    console.error('Failed to get savings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get savings by ID
exports.getSavingsById = async (req, res) => {
  try {
    // Get saving ID from request parameters
    const { id } = req.params;

    // Find saving by ID
    const saving = await Saving.findById(id);
    if (!saving) {
      return res.status(404).json({ message: 'Saving not found' });
    }

    // Return success response
    res.status(200).json({ message: 'Saving retrieved successfully', saving });
  } catch (error) {
    console.error('Failed to get saving by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete savings by ID
exports.deleteSavings = async (req, res) => {
  try {
    // Get saving ID from request parameters
    const { id } = req.params;

    // Delete the saving object
    await Saving.findByIdAndDelete(id);

    // Return success response
    res.status(200).json({ message: 'Saving deleted successfully' });
  } catch (error) {
    console.error('Failed to delete saving:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
