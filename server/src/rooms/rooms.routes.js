const express = require('express');
const roomsController = require('./controllers/rooms.controller');

const router = express.Router();

router.get('/:userId', roomsController.listRoomsByUser);
router.post('/', roomsController.createRoom);

module.exports = router;
