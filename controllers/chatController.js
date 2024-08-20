// controllers/chatController.js
const Message = require('../models/messageModel');
// controllers/chatController.js
const User = require('../models/User');

exports.getChats = async (req, res) => {
  try {
    const userId = req.userId; // Use userId from middleware

    // Find the user's chat list
    const user = await User.findById(userId).populate('chatList', 'username'); // Populate chatList with usernames

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.chatList); // Return the chatList
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { sender, recipient } = req.params;
    const messages = await Message.find({
      $or: [
        { sender, recipient },
        { sender: recipient, recipient: sender },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { recipient } = req.params;
    const { text } = req.body;
    const sender = req.userId// Handle missing user ID appropriately


    console.log('Received message text:', text,sender); // Add this line

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const message = new Message({
      sender,
      recipient,
      text,
      timestamp: new Date(),
    });

    await message.save();

    res.json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Error sending message' });
  }
};
