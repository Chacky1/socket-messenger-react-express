/* eslint-disable class-methods-use-this */
const messageModel = require('../models/messages.model');

class MessageController {
  async readMessagesByRoom(req, res) {
    try {
      const messages = await messageModel.readMessagesByRoom(req.params.roomId);
      res.status(200).send(messages);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}

module.exports = new MessageController();
