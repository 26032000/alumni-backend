const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Create news route
router.post('/', newsController.createNews);

// Get news route
router.get('/', newsController.getNews);

// Update news route
router.put('/:id', newsController.editNews);

// Delete news route
router.delete('/:id', newsController.deleteNews);

module.exports = router;