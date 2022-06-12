/* eslint-disable class-methods-use-this */
const messagesModel = require('../models/messages.model');

class MessageSocketController {
  async createMessage(socket, message) {
    socket.emit('message', message);
    try {
      await messagesModel.addMessage(message);
    } catch (error) {
      console.error(error.message);
      socket.emit('error', error.message);
    }
  }
}

module.exports = new MessageSocketController();
