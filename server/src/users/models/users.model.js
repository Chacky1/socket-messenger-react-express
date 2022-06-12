const CommonModel = require('../../common/models/common.model');

class UsersModel extends CommonModel {
  async listUsers() {
    const query = 'SELECT * FROM user';
    const databaseResult = await this.connection.promise().query(query);
    return databaseResult[0];
  }

  async getUserById(userId) {
    const query = 'SELECT * FROM user WHERE id = ?';
    const databaseResult = await this.connection.promise().query(query, userId);
    return databaseResult[0][0];
  }

  async getUserByEmail(email) {
    const query = 'SELECT * FROM user WHERE email = ?';
    const databaseResult = await this.connection.promise().query(query, email);
    return databaseResult[0][0];
  }

  async addUser(newUser) {
    const query = 'INSERT INTO user SET ?';
    const databaseResult = await this.connection.promise().query(query, newUser);
    return databaseResult[0].insertId;
  }

  async updateUser(userId, updatedUser) {
    const query = 'UPDATE user SET ? WHERE id = ?';
    await this.connection.promise().query(query, [updatedUser, userId]);
  }

  async deleteUser(userId) {
    const query = 'DELETE FROM user WHERE id = ?';
    await this.connection.promise().query(query, userId);
  }
}

module.exports = new UsersModel();
