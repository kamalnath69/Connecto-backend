const mongoose = require('mongoose');

const provideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  place: { type: String, required: true },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  accepted: { type: Boolean, default: false },
  acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
});

module.exports = mongoose.model('Provide', provideSchema);
