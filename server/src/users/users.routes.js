const express = require('express');
const usersController = require('./controllers/users.controller');

const router = express.Router();

router.get('/', usersController.listUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.addUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);
