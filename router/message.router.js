const { Router } = require('express');
const { messageController } = require('../controller/message.controller');
const messageRouter = Router();

// Get all messages
messageRouter.get('/', messageController.getAllMessages);

// Get message by ID
messageRouter.get('/:id', messageController.getMessageById);

messageRouter.get('/byIdUse/:id', messageController.getMessagesByIdUse); // This name is just a suggestion

// Create message
messageRouter.post('/', messageController.createMessage);

// Update message
messageRouter.put('/:id', messageController.updateMessage);

// Delete message
messageRouter.delete('/:id', messageController.deleteMessage);

module.exports = { messageRouter };
