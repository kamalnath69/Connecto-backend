const Seek = require('../models/Seek');
const Provide = require('../models/Provide');

// Fetch accepted seeks by the user
exports.getAcceptedSeeks = async (req, res) => {
  try {
    const seeks = await Seek.find({ acceptedBy: req.userId });
    res.status(200).json(seeks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accepted seeks', error });
  }
};

// Fetch accepted provides by the user
exports.getAcceptedProvides = async (req, res) => {
  try {
    const provides = await Provide.find({ acceptedBy: req.userId });
    res.status(200).json(provides);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accepted provides', error });
  }
};
