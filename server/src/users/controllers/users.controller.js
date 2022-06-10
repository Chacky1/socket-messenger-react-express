/* eslint-disable class-methods-use-this */
const usersModel = require('../models/users.model');

class UsersController {
  async listUsers(req, res) {
    try {
      const users = await usersModel.listUsers();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await usersModel.getUserById(req.params.id);
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async addUser(req, res) {
    try {
      const userId = await usersModel.addUser(req.body);
      res.status(201).send({ ...req.body, id: userId });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      await usersModel.updateUser(req.params.id, req.body);
      res.status(204).send();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      await usersModel.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = new UsersController();
