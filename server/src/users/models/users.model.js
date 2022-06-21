const CommonModel = require('../../common/models/common.model');

class UsersModel extends CommonModel {
  async listUsers(searchPattern) {
    let query = 'SELECT id, email, pseudo FROM user';
    const queryParameters = [];
    if (searchPattern) {
      query += ' WHERE pseudo LIKE ?';
      queryParameters.push(`%${searchPattern}%`);
    }
    const databaseResult = await this.connection.promise().query(query, queryParameters);
    return databaseResult[0];
  }

  async getUserById(userId) {
    const query = 'SELECT id, email, pseudo FROM user WHERE id = ?';
    const databaseResult = await this.connection.promise().query(query, userId);
    return databaseResult[0][0];
  }

  async getUserByEmail(email) {
    const query = 'SELECT id, email, pseudo FROM user WHERE email = ?';
    const databaseResult = await this.connection.promise().query(query, email);
    return databaseResult[0][0];
  }

  async getUserByEmailWithCredentials(email) {
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

  async listFriends(userId) {
    const query = 'SELECT id_friend FROM friends WHERE id_user = ?';
    const databaseResult = await this.connection.promise().query(query, userId);
    return databaseResult[0].map((result) => result.id_friend);
  }

  async addFriend(userId, friendId) {
    const query = 'INSERT INTO friends (id_user, id_friend) VALUES (?, ?)';
    await this.connection.promise().query(query, [userId, friendId]);
  }

  async deleteFriend(userId, friendId) {
    const query = 'DELETE FROM friends WHERE id_user = ? AND id_friend = ?';
    await this.connection.promise().query(query, [userId, friendId]);
  }
}

module.exports = new UsersModel();
