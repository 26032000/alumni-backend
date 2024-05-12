const express = require('express');
const router = express.Router();
const sharesController = require('../controllers/shareController');

// GET all shares
router.get('/', sharesController.getAllShares);

// GET all shares of a single user
router.get('/user', sharesController.getSharesByUser);

// GET share by ID
router.get('/:id', sharesController.getShareById);

// POST create a new share
router.post('/', sharesController.createShare);
// POST buy shares
router.post('/buy', sharesController.buyShare);


// PUT update share by ID
router.put('/:id', sharesController.updateShareById);

// DELETE delete share by ID
router.delete('/:id', sharesController.deleteShareById);

module.exports = router;
