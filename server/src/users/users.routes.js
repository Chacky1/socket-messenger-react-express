const express = require('express');
const usersController = require('./controllers/users.controller');
const usersMiddleware = require('./middlewares/users.middleware');

const router = express.Router();

router.get('/', usersController.listUsers);
router.get('/:id', usersController.getUserById);
router.post('/', [
  usersMiddleware.checkUserInfosInBodyRequest,
  usersMiddleware.checkEmailDoesNotExist,
  usersMiddleware.checkUserInfosPolicyAtCreation,
  usersController.addUser,
]);
router.put('/:id', [
  usersMiddleware.checkUserInfosPolicyAtUpdate,
  usersController.updateUser,
]);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
