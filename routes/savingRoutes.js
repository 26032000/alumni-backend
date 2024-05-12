const express = require('express');
const router = express.Router();
const savingController = require('../controllers/savingController');

// Deposit savings
router.post('/', savingController.depositSavings);

// Get all savings
router.get('/', savingController.getSavings);

// Get savings by ID
router.get('/:id', savingController.getSavingsById);

// Delete savings by ID
router.delete('/:id', savingController.deleteSavings);

module.exports = router;
