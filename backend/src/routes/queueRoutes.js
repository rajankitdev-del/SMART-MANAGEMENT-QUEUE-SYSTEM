const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queueController');

// Route: Get overall queue status
router.get('/status', queueController.getQueueStatus);

// Route: Get number of people ahead
router.get('/people-ahead', queueController.getPeopleAhead);

module.exports = router;
