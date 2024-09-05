const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Seeker', 'Provider'], required: true },
  place: { type: String, default: '' },
  about: { type: String, default: '' },
  profileUrl: { type: String, default: '' },
  pinnedSeeks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seek' }],
  pinnedProvides: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Provide' }],
  chatList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  buddies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('User', userSchema);
