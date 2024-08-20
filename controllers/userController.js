const User = require("../models/User");

const updateUserProfile = async (req, res) => {
    try {
      const { name, email } = req.body;
      const user = await User .findByIdAndUpdate(req.user.id, { name, email }, { new: true });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error updating profile', error });
    }
  };
  
  // Add endpoint for getting user profile
  const getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching profile', error });
    }
  };
  
  module.exports = { updateUserProfile, getUserProfile };