const express = require('express');

const authController = require('./controllers/auth.controller');

const router = express.Router();

router.get('/logout', authController.logout);
router.get('/reconnect', authController.reconnect);
router.post('/login', authController.login);

module.exports = router;
