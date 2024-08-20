const Seek = require('../models/Seek');
const User = require('../models/User');

exports.createSeek = async (req, res) => {
  const { title, description, place } = req.body;
  
  if (!title || !description || !place) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthorizeddd' });
  }

  try {
    const seek = await Seek.create({
      title,
      description,
      place,
      seekerId: req.userId
    });

    res.status(201).json(seek);
  } catch (error) {
    console.error('Error creating seek:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getSeeksByPlace = async (req, res) => {
  const { place } = req.query;

  if (!place) {
    return res.status(400).json({ message: 'Place query parameter is required' });
  }

  try {
    const seeks = await Seek.find({
      place,
      seekerId: { $ne: req.userId }, // Exclude seeks created by the requested user
      $or: [
        { accepted: false }, // Include seeks that are not accepted
        { accepted: true, acceptedBy: req.userId } // Include seeks accepted by the user
      ]
    });
    res.status(200).json(seeks);
  } catch (error) {
    console.error('Error fetching seeks:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.acceptSeek = async (req, res) => {
  const { seekId } = req.params;
  console.log("received", seekId);

  try {
    const seek = await Seek.findById(seekId);
    if (!seek) {
      return res.status(404).json({ message: 'Seek not found' });
    }

    if (seek.accepted) {
      console.log("Seek already accepted");
      return res.status(400).json({ message: 'Seek already accepted' });
    }

    seek.accepted = true;
    seek.acceptedBy = req.userId;
    await seek.save();

    const seeker = await User.findById(seek.seekerId);
    const acceptor = await User.findById(req.userId);

    // Check if the acceptor is already in the seeker's chat list
    if (!seeker.chatList.includes(req.userId)) {
      seeker.chatList.push(req.userId);
    }

    // Check if the seeker is already in the acceptor's chat list
    if (!acceptor.chatList.includes(seek.seekerId)) {
      acceptor.chatList.push(seek.seekerId);
    }

    await seeker.save();
    await acceptor.save();

    res.status(200).json({ message: 'Seek accepted successfully', seek });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.cancelAcceptance = async (req, res) => {
  const { seekId } = req.params;

  try {
    const seek = await Seek.findById(seekId);
    if (!seek) {
      return res.status(404).json({ message: 'Seek not found' });
    }

    if (seek.acceptedBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to cancel this acceptance' });
    }

    seek.accepted = false;
    seek.acceptedBy = null;
    await seek.save();

    res.status(200).json({ message: 'Acceptance cancelled successfully', seek });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSeek = async (req, res) => {
  try {
    await Seek.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Seek deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting seek', error });
  }
};

