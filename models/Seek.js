const mongoose = require('mongoose');

const seekSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  place: { type: String, required: true },
  seekerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true },
  accepted: { type: Boolean, default: false },
  acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
});

module.exports = mongoose.model('Seek', seekSchema);
