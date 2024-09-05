const User = require('../models/User');

const updateUserProfile = async (req, res) => {
  try {
    const { fullname, email, about, place, role, profileUrl } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { fullname, email, about, place, role, profileUrl },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating profile', error });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    console.log(query)
    const users = await User.find({
      fullname: { $regex: query, $options: 'i' },
    });

    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error searching users', error });
  }
};

module.exports = { updateUserProfile, getUserProfile, searchUsers };
