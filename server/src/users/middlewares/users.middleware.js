/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
const Joi = require('joi');
const usersModel = require('../models/users.model');

class UsersMiddleware {
  checkUserInfosInBodyRequest(req, res, next) {
    if (req.body && req.body.email && req.body.password && req.body.repeat_password && req.body.pseudo) {
      next();
    } else {
      res.status(400).send({ message: 'Some informations are missing.' });
    }
  }

  checkUserInfosPolicyAtCreation(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().pattern('/^[a-zA-Z0-9]{3,30}$/').required(),
      repeat_password: Joi.ref('password').required(),
      pseudo: Joi.string().alphanum().min(3).max(30)
        .required(),
    });

    const error = schema.validate();

    if (error) {
      res.status(422).send({ message: error });
    } else {
      next();
    }
  }

  checkUserInfosPolicyAtUpdate(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string().pattern('/^[a-zA-Z0-9]{3,30}$/'),
      repeat_password: Joi.ref('password'),
      pseudo: Joi.string().alphanum().min(3).max(30),
    });

    const error = schema.validate();

    if (error) {
      res.status(422).send({ message: error });
    } else {
      next();
    }
  }

  async checkEmailDoesNotExist(req, res, next) {
    const user = await usersModel.getUserByEmail();
    if (user) {
      res.status(409).send('Same email belongs to another user.');
    } else {
      next();
    }
  }
}

module.exports = new UsersMiddleware();
