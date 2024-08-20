// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Import the auth middleware
const chatController = require('../controllers/chatController');

// Get chats for the authenticated user
router.get('/', authMiddleware, chatController.getChats);

// Get messages between sender and receiver
router.get('/messages/:sender/:recipient', authMiddleware, chatController.getMessages);

// Send a message from the authenticated user to the receiver
router.post('/messages/:recipient', authMiddleware, chatController.sendMessage);

module.exports = router;
