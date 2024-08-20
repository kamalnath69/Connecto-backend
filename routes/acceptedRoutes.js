const express = require('express');
const { getAcceptedSeeks, getAcceptedProvides } = require('../controllers/acceptedController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route for fetching accepted seeks
router.get('/seeks', authMiddleware, getAcceptedSeeks);

// Route for fetching accepted provides
router.get('/provides', authMiddleware, getAcceptedProvides);

module.exports = router;
