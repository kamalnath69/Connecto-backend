const express = require('express');
const provideController = require('../controllers/provideController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, provideController.createProvide);
router.get('/', authMiddleware, provideController.getProvidesByPlace);
router.post('/:provideId/accept', authMiddleware, provideController.acceptProvide); // Add this line
router.post('/:provideId/cancel', authMiddleware, provideController.cancelProvideAcceptance); // Add this line
router.delete('/delete', authMiddleware, provideController.deleteProvide)

module.exports = router;
