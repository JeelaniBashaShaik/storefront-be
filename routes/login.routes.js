const express = require('express');
const router = express.Router();

const LoginController = require('./../controllers/login.controller');
const { route } = require('./user.routes');

router.post('/login', LoginController.loginUser);
router.post('/register', LoginController.registerUser);

module.exports = router;