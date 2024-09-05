const mongoose = require('mongoose');
const Comment = require('./Comment'); // Import the Comment model

const seekSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  place: { type: String, required: true },
  seekerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accepted: { type: Boolean, default: false },
  acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  image: { type: String, default: null },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] // Reference to comments
});

module.exports = mongoose.model('Seek', seekSchema);
