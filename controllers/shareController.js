const Share = require('../models/Shares');
const Transaction = require('../models/Transactions');
const mongoose = require('mongoose');



// Controller function to get all shares
exports.getAllShares = async (req, res) => {
  try {
    const shares = await Share.find();
    res.json({ shares });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
// Controller function to get all shares of a single user
// Controller function to get all shares of a single user
exports.getSharesByUser = async (req, res) => {
  try {
    // Check if req.user or req.user.id is undefined
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'User ID not found' });
    }

    const shares = await Share.find({ user: req.user.id });
    const totalShares = await Share.countDocuments({ user: req.user.id });
    res.json({ shares, totalShares });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Controller function to get share by ID
exports.getShareById = async (req, res) => {
  try {
    const share = await Share.findById(req.params.id);
    if (!share) {
      return res.status(404).json({ message: 'Share not found' });
    }
    res.json({ share });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to create a new share
exports.createShare = async (req, res) => {
  try {
    const { name, description, totalQuantity, currentPrice } = req.body;
    const share = new Share({
      name,
      description,
      totalQuantity,
      currentPrice
    });
    await share.save();
    res.status(201).json({ message: 'Share created successfully', share });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to update a share by ID
exports.updateShareById = async (req, res) => {
  try {
    const { name, description, totalQuantity, currentPrice } = req.body;
    const share = await Share.findByIdAndUpdate(
      req.params.id,
      { name, description, totalQuantity, currentPrice },
      { new: true }
    );
    if (!share) {
      return res.status(404).json({ message: 'Share not found' });
    }
    res.json({ message: 'Share updated successfully', share });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to delete a share by ID
exports.deleteShareById = async (req, res) => {
  try {
    const share = await Share.findByIdAndDelete(req.params.id);
    if (!share) {
      return res.status(404).json({ message: 'Share not found' });
    }
    res.json({ message: 'Share deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Controller function to buy shares
exports.buyShare = async (req, res) => {
  try {
    const { shareId, userId, quantity } = req.body;

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Retrieve the share from the database
    const share = await Share.findById(shareId);
    if (!share) {
      return res.status(404).json({ message: 'Share not found' });
    }

    // Calculate the total price
    const totalPrice = quantity * share.currentPrice;

    // Assume you have logic to deduct the total price from the user's account balance
    // This part is not shown in your provided controller

    // Update the share's quantity
    share.totalQuantity -= quantity;
    await share.save();

    // Create a transaction record
    const transaction = new Transaction({
      type: 'share',
      userId: userId,
      amount: totalPrice,
      description: `Bought ${quantity} shares of ${share.name}`
    });
    await transaction.save();

    // Return a success response with transaction details
    res.json({ message: 'Share purchased successfully', transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


