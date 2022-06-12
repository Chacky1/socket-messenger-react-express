/* eslint-disable prefer-regex-literals */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
const Joi = require('joi');
const usersModel = require('../models/users.model');

class UsersMiddleware {
  checkUserInfosInBodyRequest(req, res, next) {
    if (req.body && req.body.email && req.body.password && req.body.pseudo) {
      next();
    } else {
      res.status(400).send({ message: 'Some informations are missing.' });
    }
  }

  checkUserInfosPolicyAtCreation(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
      pseudo: Joi.string().alphanum().min(3).max(30)
        .required(),
    });

    const { error } = schema.validate({ ...req.body });

    if (error) {
      res.status(422).send({ validationErrors: error.details });
    } else {
      next();
    }
  }

  checkUserInfosPolicyAtUpdate(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email(),
      pseudo: Joi.string().alphanum().min(3).max(30),
    });

    const { error } = schema.validate({ ...req.body });

    if (error) {
      res.status(422).send({ validationErrors: error.details });
    } else {
      next();
    }
  }

  async checkEmailDoesNotExist(req, res, next) {
    try {
      const user = await usersModel.getUserByEmail(req.body.email);
      if (user) {
        res.status(409).send('Same email belongs to another user.');
      } else {
        next();
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = new UsersMiddleware();
