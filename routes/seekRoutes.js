const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const seekController = require('../controllers/seekController');

router.post('/', authMiddleware, seekController.createSeek);
router.get('/', authMiddleware, seekController.getSeeksByPlace);
router.post('/:seekId/accept', authMiddleware, seekController.acceptSeek); // Add this line
router.post('/:seekId/cancel', authMiddleware, seekController.cancelAcceptance); // Add this line
router.delete('/delete', authMiddleware, seekController.deleteSeek); // Add this line

module.exports = router;
