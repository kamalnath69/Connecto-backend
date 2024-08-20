const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Seeker', 'Provider'], required: true },
  place: { type: String, default: '' },
  pinnedSeeks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seek' }], // Pinned Seeks
  pinnedProvides: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Provide' }], // Pinned Provides
  chatList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Chat list
});

module.exports = mongoose.model('User', userSchema);
