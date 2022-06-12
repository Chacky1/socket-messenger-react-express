/* eslint-disable class-methods-use-this */
const jwt = require('jsonwebtoken');
const usersModel = require('../../users/models/users.model');

const EXPIRES_LOGOUT = 1;
const EXPIRES_LOGIN = 60 * 60 * 24;

class AuthController {
  async login(req, res) {
    try {
      const userInfo = await usersModel.getUserByEmail(req.body.email);
      const token = jwt.sign(userInfo, process.env.JWT_TOKEN, { expiresIn: EXPIRES_LOGIN });
      res.cookie('jwt-token', token, { maxAge: EXPIRES_LOGIN });
      res.status(201).send(userInfo);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  logout(req, res) {
    const token = jwt.sign({}, process.env.JWT_TOKEN, { expiresIn: EXPIRES_LOGIN });
    res.cookie('jwt-token', token, { maxAge: EXPIRES_LOGOUT });
    res.status(201).send();
  }

  async reconnect(req, res) {
    try {
      const userInfo = await usersModel.getUserByEmail(req.body.email);
      res.status(200).send(userInfo);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = new AuthController();
