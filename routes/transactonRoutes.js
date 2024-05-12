const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionsController');

// POST create a new transaction
router.post('/', transactionController.createTransaction);
router.get('/', transactionController.getAllTransactions);

// GET transaction by ID
router.get('/:id', transactionController.getTransactionById);

// DELETE transaction by ID
router.delete('/:id', transactionController.deleteTransactionById);

module.exports = router;
