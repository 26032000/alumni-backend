const Transaction = require('../models/Transactions');

// Controller function to create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { type, userId, amount, description } = req.body;

    // Create a new transaction object
    const transaction = new Transaction({
      type,
      userId,
      amount,
      description
    });

    // Save the transaction to the database
    await transaction.save();

    // Return a success response
    res.status(201).json({ message: 'Transaction created successfully', transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to get all transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json({ transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to get transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to delete transaction by ID
exports.deleteTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
