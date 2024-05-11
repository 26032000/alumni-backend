
const Loan = require('../models/Loan');
const User = require('../models/User');

// Create loan route
exports.creatLoans=async (req, res) => {
  // Get the user id from the request body
  const { userId } = req.body;

  // Get the user by id
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Get the loan amount from the request body
  const { amount } = req.body;

  // Create a new loan object
  const newLoan = new Loan({
    user,
    amount,
  });

  // Save the new loan object
  await newLoan.save();

  // Return success response
  res.status(201).json({ message: 'Loan created successfully', loan: newLoan });
};

// Get loans route
exports.getLoans= async (req, res) => {
  // Find all loans
  const loans = await Loan.find();

  // Return success response
  res.status(200).json({ message: 'Loans retrieved successfully', loans });
};

// Update loan route
exports.putLoans= async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedLoan = await Loan.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedLoan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    res.json(updatedLoan);
  } catch (error) {
    console.error('Failed to update loan status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Delete loan route
exports.deleteLoans= async (req, res) => {
  // Get the loan id from the request params
  const { id } = req.params;

  // Delete the loan object
  await Loan.findByIdAndDelete(id);

  // Return success response
  res.status(200).json({ message: 'Loan deleted successfully' });
};

