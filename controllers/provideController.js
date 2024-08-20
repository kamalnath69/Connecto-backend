const Provide = require('../models/Provide');
const User = require('../models/User');

exports.createProvide = async (req, res) => {
  const { title, description, place } = req.body;

  if (!title || !description || !place) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const provide = await Provide.create({
      title,
      description,
      place,
      providerId: req.userId
    });

    res.status(201).json(provide);
  } catch (error) {
    console.error('Error creating provide:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getProvidesByPlace = async (req, res) => {
  const { place } = req.query;

  if (!place) {
    return res.status(400).json({ message: 'Place query parameter is required' });
  }
  try {
    const provides = await Provide.find({
      place,
      providerId: { $ne: req.userId }, 
      accepted: false
    });
    res.status(200).json(provides);
  } catch (error) {
    console.error('Error fetching provides:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.acceptProvide = async (req, res) => {
  const { provideId } = req.params;
  
  try {
    const provide = await Provide.findById(provideId);
    if (!provide) {
      return res.status(404).json({ message: 'Provide not found' });
    }

    if (provide.accepted) {
      return res.status(400).json({ message: 'Provide already accepted' });
    }

    provide.accepted = true;
    provide.acceptedBy = req.userId;
    await provide.save();

    const provider = await User.findById(provide.providerId);
    const acceptor = await User.findById(req.userId);

    // Add each other to chat lists
    provider.chatList.push(req.userId);
    acceptor.chatList.push(provide.providerId);

    await provider.save();
    await acceptor.save();

    res.status(200).json({ message: 'Provide accepted successfully', provide });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelProvideAcceptance = async (req, res) => {
  const { provideId } = req.params;

  try {
    const provide = await Provide.findById(provideId);
    if (!provide) {
      return res.status(404).json({ message: 'Provide not found' });
    }

    if (provide.acceptedBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to cancel this acceptance' });
    }

    provide.accepted = false;
    provide.acceptedBy = null;
    await provide.save();

    res.status(200).json({ message: 'Acceptance cancelled successfully', provide });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteProvide = async (req, res) => {
  try {
    await Provide.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Provide deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting provide', error });
  }
};
