const Loan = require('../models/Loan');
const User = require('../models/User');
const Transaction = require('../models/Transactions');

// Apply for a loan
exports.applyLoan = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    // Get the user by id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new loan object
    const newLoan = new Loan({
      user: user._id,
      amount,
      status: 'pending' // Assuming all loans start with 'pending' status
    });

    // Save the new loan object
    await newLoan.save();

    // Return success response
    res.status(201).json({ message: 'Loan application submitted successfully', loan: newLoan });
  } catch (error) {
    console.error('Failed to apply for loan:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Approve a loan
exports.approveLoan = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedLoan = await Loan.findByIdAndUpdate(id, { status: 'approved' }, { new: true });

    if (!updatedLoan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    // Create a transaction record for the approved loan
    const transaction = new Transaction({
      type: 'loan',
      userId: updatedLoan.user,
      amount: updatedLoan.amount,
      description: 'Loan approved'
    });
    await transaction.save();

    res.json({ message: 'Loan approved successfully', loan: updatedLoan });
  } catch (error) {
    console.error('Failed to approve loan:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Pay a loan (in full or installment)
exports.payLoan = async (req, res) => {
  const { id } = req.params;
  const { amountPaid, paymentType } = req.body;

  try {
    // Get the loan by id
    const loan = await Loan.findById(id);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    // Calculate the remaining balance after payment
    const remainingBalance = loan.amount - amountPaid;

    // Update loan status based on remaining balance and payment type
    let status = '';
    if (remainingBalance === 0) {
      status = 'paid';
    } else if (paymentType === 'installment') {
      status = 'partially_paid';
    } else {
      status = 'pending';
    }

    // Update loan status and save
    loan.status = status;
    await loan.save();

    // Create a transaction record for the loan payment
    const transaction = new Transaction({
      type: 'loan',
      userId: loan.user,
      amount: amountPaid,
      description: `Loan payment of ${amountPaid} (${paymentType})`
    });
    await transaction.save();

    res.json({ message: 'Loan payment processed successfully', loan });
  } catch (error) {
    console.error('Failed to process loan payment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all applied loans
exports.getAppliedLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ status: 'pending' });
    res.json({ loans });
  } catch (error) {
    console.error('Failed to get applied loans:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Check loan eligibility based on savings
exports.checkLoanEligibility = async (req, res) => {
  const { userId, loanAmount } = req.body;

  try {
    // Get the user by id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user's savings are sufficient for the loan amount
    if (user.savings >= loanAmount) {
      res.json({ message: 'Loan eligible' });
    } else {
      res.json({ message: 'Loan not eligible' });
    }
  } catch (error) {
    console.error('Failed to check loan eligibility:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a loan
exports.deleteLoan = async (req, res) => {
  const { id } = req.params;

  try {
    await Loan.findByIdAndDelete(id);
    res.json({ message: 'Loan deleted successfully' });
  } catch (error) {
    console.error('Failed to delete loan:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
