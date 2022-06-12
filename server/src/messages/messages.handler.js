const messageSocketController = require('./controllers/messagesSocket.controller');

const registerMessageHandler = (io, socket) => {
  socket.on('message:create', (message) => messageSocketController.createMessage(socket, message));
};

module.exports = registerMessageHandler;
