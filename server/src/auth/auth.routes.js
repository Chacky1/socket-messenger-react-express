const express = require('express');

const authController = require('./controllers/auth.controller');
const authMiddleware = require('./middlewares/auth.middleware');

const router = express.Router();

router.get('/logout', authController.logout);
router.get('/reconnect', [
  authMiddleware.checkCookieStillValid,
  authController.reconnect,
]);
router.post('/login', [
  authMiddleware.checkBodyRequestInfos,
  authMiddleware.checkEmailExists,
  authMiddleware.checkPasswordValidity,
  authController.login,
]);

module.exports = router;
