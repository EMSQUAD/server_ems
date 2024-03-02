const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');

// Route to create a new message
router.post('/', messageController.createMessage);

// Route to get all messages
router.get('/', messageController.getAllMessages);

module.exports = router;
