const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');

// Route to create a new message
router.post('/', messageController.createMessage);

// Route to get all messages
router.get('/', messageController.getAllMessages);

// Route to get a single message by ID
router.get('/:id', messageController.getMessageById);

// Route to update a message by ID
router.put('/:id', messageController.updateMessageById);

// Route to delete a message by ID
router.delete('/:id', messageController.deleteMessageById);

module.exports = router;
