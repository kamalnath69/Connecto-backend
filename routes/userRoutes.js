// routes/userRoutes.js
const express = require('express');
const { updateUserProfile, getUserProfile,searchUsers } = require('../controllers/userController.js');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User.js');

const router = express.Router();

// Route for getting the user profile
router.get('/profile', authMiddleware, getUserProfile);
router.get('/search', authMiddleware, searchUsers);
router.put('/update', authMiddleware, updateUserProfile);
router.get('/userId', authMiddleware, (req, res) => {
    res.json({ userId: req.userId });
  });

router.get('/:username', authMiddleware, async (req, res) => {
  console.log('Fetching user profile for:', req.params.username)
  try {
    const user = await User.findOne({ username: req.params.username });
    res.json(user);
  }catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching user profile', error });
  }});

module.exports = router;
