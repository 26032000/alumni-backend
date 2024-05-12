const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

// Apply for a loan
router.post('/', loanController.applyLoan);

// Approve a loan
router.put('/:id/approve', loanController.approveLoan);

// Pay a loan
router.put('/:id/pay', loanController.payLoan);

// Get all applied loans
router.get('/applied', loanController.getAppliedLoans);

// Check loan eligibility
router.post('/check-eligibility', loanController.checkLoanEligibility);

// Delete a loan
router.delete('/:id', loanController.deleteLoan);

module.exports = router;
