const userController = require('../controllers/userController');
const authenticate = require('../../services/auth/authenticate');
const express = require('express');
const users = express.Router();

    users.get('/', userController.getUsers);
    users.get('/me', authenticate, userController.getUserInfo);
    users.post('/', userController.createUser);
    users.post('/login', userController.signIn);
    users.delete('/me/token', authenticate, userController.signOut)

module.exports = users;
