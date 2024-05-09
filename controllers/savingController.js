const express = require('express');
const router = express.Router();
const Saving = require('../models/Saving');
const User = require('../models/User');

// Create saving route
exports.createSaving= async (req, res) => {
  // Get the user id from the request body
  const { userId } = req.body;

  // Get the user by id
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Get the saving amount from the request body
  const { amount } = req.body;

  // Create a new saving object
  const newSaving = new Saving({
    user,
    amount,
  });

  // Save the new saving object
  await newSaving.save();

  // Return success response
  res.status(201).json({ message: 'Saving created successfully', saving: newSaving });
};

// Get savings route
exports.getSavings= async (req, res) => {
  // Find all savings
  const savings = await Saving.find();

  // Return success response
  res.status(200).json({ message: 'Savings retrieved successfully', savings });
};

// Update saving route
exports.editSavings= async (req, res) => {
  // Get the saving id from the request params
  const { id } = req.params;

  // Get the saving data from the request body
  const { amount } = req.body;

  // Update the saving object
  const updatedSaving = await Saving.findByIdAndUpdate(id, {
    amount,
  });

  // Return success response
  res.status(200).json({ message: 'Saving updated successfully', saving: updatedSaving });
};

// Delete saving route
exports.deleteSavings= async (req, res) => {
  // Get the saving id from the request params
  const { id } = req.params;

  // Delete the saving object
  await Saving.findByIdAndDelete(id);

  // Return success response
  res.status(200).json({ message: 'Saving deleted successfully' });
};

