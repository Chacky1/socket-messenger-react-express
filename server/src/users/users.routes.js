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

router.get('/:userId/friends', usersController.listFriends);
router.post('/:userId/friends', [
  usersMiddleware.checkNewContactInBodyRequest,
  usersMiddleware.checkNewContactIsNotAFriend,
  usersController.addFriend,
]);
router.delete('/:userId/friends/:friendId', usersController.deleteFriend);

module.exports = router;
