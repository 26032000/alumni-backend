const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Create event route
router.post('/', eventController.createEvent);

// Get events route
router.get('/', eventController.getEvents);

// Update event route
router.put('/:id', eventController.editEvents);

// Delete event route
router.delete('/:id', eventController.deleteEvents);

module.exports = router;