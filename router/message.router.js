const express = require('express');
const router = express.Router();

// Define your message routes here
router.get('/', (req, res) => {
    // Handle GET request to retrieve messages
    res.send('GET request to /messages endpoint');
});

router.post('/', (req, res) => {
    // Handle POST request to create a new message
    res.send('POST request to /messages endpoint');
});

// Export the router instance
module.exports = router;
