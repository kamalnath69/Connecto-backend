const User = require('../models/User');
const Seek = require('../models/Seek');
const Provide = require('../models/Provide');

// Pin a Seek
exports.pinSeek = async (req, res) => {
  console.log("received")
  try {
    const user = await User.findById(req.userId);
    if (!user.pinnedSeeks.includes(req.params.seekId)) {
      user.pinnedSeeks.push(req.params.seekId);
      await user.save();
    }
    res.status(200).json(user.pinnedSeeks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unpin a Seek
exports.unpinSeek = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.pinnedSeeks = user.pinnedSeeks.filter(seekId => seekId.toString() !== req.params.seekId);
    await user.save();
    res.status(200).json(user.pinnedSeeks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Pin a Provide
exports.pinProvide = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user.pinnedProvides.includes(req.params.provideId)) {
      user.pinnedProvides.push(req.params.provideId);
      await user.save();
    }
    res.status(200).json(user.pinnedProvides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unpin a Provide
exports.unpinProvide = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.pinnedProvides = user.pinnedProvides.filter(provideId => provideId.toString() !== req.params.provideId);
    await user.save();
    res.status(200).json(user.pinnedProvides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch pinned Seeks and Provides
exports.getPinnedItems = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const pinnedSeeks = await Seek.find({ _id: { $in: user.pinnedSeeks } });
    const pinnedProvides = await Provide.find({ _id: { $in: user.pinnedProvides } });
    res.status(200).json({ pinnedSeeks, pinnedProvides });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
