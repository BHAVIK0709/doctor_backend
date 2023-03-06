const express = require('express');
const userRoutes =  express.Router();
const {  addUser,getUser,loginUser, authContoller } = require('../controller/user.controller.js');
const authenticateJWT = require('../middleware/auth.js');

userRoutes.post('/signup',addUser );
userRoutes.get('/getUsers',getUser);
userRoutes.post('/login',loginUser);
userRoutes.get('/getUserData' ,authenticateJWT,authContoller)

module.exports = userRoutes;