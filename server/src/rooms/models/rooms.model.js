const CommonModel = require('../../common/models/common.model');

class RoomsModel extends CommonModel {
  async listRoomsByUser(userId) {
    const query = 'SELECT * FROM room INNER JOIN user_room ON user_room.id_room = room.id WHERE id_user = ?';
    const databaseResult = await this.connection.promise().query(query, userId);
    return databaseResult[0];
  }

  async createRoom(roomName, userId) {
    const queryRoom = 'INSERT INTO room (name) VALUES (?)';
    const queryRoomUser = 'INSERT INTO user_room (id_user, id_room) VALUES (?, ?)';
    const roomDatabaseResult = await this.connection.promise().query(queryRoom, roomName);
    await this.connection.promise().query(queryRoomUser, [userId, roomDatabaseResult[0].insertId]);
    return roomDatabaseResult[0].insertId;
  }
}

module.exports = new RoomsModel();
