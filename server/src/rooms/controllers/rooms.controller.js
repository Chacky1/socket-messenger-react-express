/* eslint-disable class-methods-use-this */
const roomsModel = require('../models/rooms.model');

class RoomsController {
  async listRoomsByUser(req, res) {
    try {
      const rooms = await roomsModel.listRoomsByUser(req.params.userId);
      res.status(200).send(rooms);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async createRoom(req, res) {
    try {
      const roomId = await roomsModel.createRoom(req.body.name);
      res.status(201).send({ id: roomId, name: req.body.name });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = new RoomsController();
