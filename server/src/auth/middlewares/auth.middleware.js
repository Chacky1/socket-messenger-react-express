/* eslint-disable class-methods-use-this */
const argon2 = require('argon2');
const usersModel = require('../../users/models/users.model');

class AuthMiddleware {
  checkBodyRequestInfos(req, res, next) {
    if (req.body && req.body.email && req.body.password) {
      next();
    } else {
      res.status(400).send({ message: 'Some informations are missing.' });
    }
  }

  async checkEmailExists(req, res, next) {
    const user = await usersModel.getUserByEmail(req.body.email);
    if (user && user.email === req.body.email) {
      next();
    } else {
      res.status(400).send({ message: 'Email or/and Password are invalid.' });
    }
  }

  async checkPasswordValidity(req, res, next) {
    const user = await usersModel.getUserByEmail(req.body.email);
    if (await argon2.verify(user.password, req.body.password)) {
      next();
    } else {
      res.status(400).send({ message: 'Email or/and Password are invalid.' });
    }
  }

  checkCookieStillValid(req, res, next) {
    if (req.cookies && req.cookies['jwt-token'].maxAge > Date.now()) {
      next();
    } else {
      res.status(401).send('You are not authenticated.');
    }
  }
}

module.exports = new AuthMiddleware();
