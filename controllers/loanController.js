
const Loan = require('../models/Loan');
const User = require('../models/User');

// Create loan route
exports.createLoans = async (req, res) => {
  const { userIdno } = req.body;
  const user = await User.findOne({ idno: userIdno });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const { amount } = req.body;
  const newLoan = new Loan({
    user,
    amount,
  });
  await newLoan.save();

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
  // Get the loan id from the request params
  const { id } = req.params;

  // Get the loan data from the request body
  const { amount } = req.body;

  // Update the loan object
  const updatedLoan = await Loan.findByIdAndUpdate(id, {
    amount,
  });

  // Return success response
  res.status(200).json({ message: 'Loan updated successfully', loan: updatedLoan });
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

