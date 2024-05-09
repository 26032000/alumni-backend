const express = require('express');
const router = express.Router();
const savingController = require('../controllers/savingController');

// Create saving route
router.post('/', savingController.createSaving);

// Get savings route
router.get('/', savingController.getSavings);

// Update saving route
router.put('/:id', savingController.editSavings);

// Delete saving route
router.delete('/:id', savingController.deleteSavings);

module.exports = router;