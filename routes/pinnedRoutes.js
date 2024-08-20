const express = require('express');
const { pinSeek, unpinSeek, pinProvide, unpinProvide, getPinnedItems } = require('../controllers/pinnedController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Routes for pinning and unpinning Seeks
router.post('/seeks/:seekId/pin', authMiddleware, pinSeek);
router.delete('/seeks/:seekId/unpin', authMiddleware, unpinSeek);

// Routes for pinning and unpinning Provides
router.post('/provides/:provideId/pin', authMiddleware, pinProvide);
router.delete('/provides/:provideId/unpin', authMiddleware, unpinProvide);

// Route for fetching pinned items
router.get('/', authMiddleware, getPinnedItems);

module.exports = router;
