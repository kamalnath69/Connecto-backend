// routes/userRoutes.js
const express = require('express');
const { updateUserProfile, getUserProfile } = require('../controllers/userController.js');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route for getting the user profile
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);
router.get('/userId', authMiddleware, (req, res) => {
    res.json({ userId: req.userId });
  });

module.exports = router;
