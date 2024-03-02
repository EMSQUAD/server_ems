const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  id_use: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
