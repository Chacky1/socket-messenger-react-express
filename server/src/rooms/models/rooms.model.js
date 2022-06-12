const CommonModel = require('../../common/models/common.model');

class RoomsModel extends CommonModel {
  async createRoom(newRoom) {
    const query = 'INSERT INTO room (name) VALUES ?';
    const databaseResult = await this.connection.promise().query(query, newRoom);
    return databaseResult.insertId;
  }
}

module.exports = new RoomsModel();
