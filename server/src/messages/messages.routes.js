const express = require('express');
const messageController = require('./controllers/messages.controller');

const router = express.Router();

router.get('/:roomId', messageController.readMessagesByRoom);

module.exports = router;
