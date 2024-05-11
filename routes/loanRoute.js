const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

// Create loan route
router.post('/', loanController.createLoans);

// Get loans route
router.get('/', loanController.getLoans);

// Update loan route
router.put('/:id', loanController.putLoans);

// Delete loan route
router.delete('/:id', loanController.deleteLoans);

module.exports = router;