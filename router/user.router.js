const express = require('express');
const userRoutes =  express.Router();
const {  addUser,getUser,loginUser } = require('../controller/user.controller.js');

userRoutes.post('/signup',addUser );
userRoutes.get('/getUsers',getUser);
userRoutes.post('/login',loginUser);

module.exports = userRoutes;