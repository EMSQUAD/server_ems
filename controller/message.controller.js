const Message = require('../models/message.model');

// Controller to handle creating a new message
exports.createMessage = async (req, res) => {
  try {
    const { id_use, text, imageUrl } = req.body;
    const message = new Message({ id_use, text, imageUrl });
    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to handle retrieving all messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
