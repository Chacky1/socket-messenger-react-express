const express = require('express');
const roomsController = require('./controllers/rooms.controller');
const roomsMiddleware = require('./middlewares/rooms.middleware');

const router = express.Router();

router.get('/:userId', roomsController.listRoomsByUser);
router.post('/', [
  roomsMiddleware.checkBodyRequest,
  roomsController.createRoom,
]);

module.exports = router;
