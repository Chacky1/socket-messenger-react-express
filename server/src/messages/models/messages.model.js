const CommonModel = require('../../common/models/common.model');

class MessagesModel extends CommonModel {
  async addMessage(message) {
    await this.connection.promise().query('INSERT INTO message (id_user, id_room, content) VALUES (?, ?, ?)', message.id_user, message.id_room, message.content);
  }

  async readMessagesByRoom(roomId) {
    const query = 'SELECT * FROM message WHERE id_room = ?';
    const databaseResult = await this.connection.promise().query(query, roomId);
    return databaseResult[0];
  }
}

module.exports = new MessagesModel();
