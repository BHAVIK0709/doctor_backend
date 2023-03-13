const express = require('express');
const { getAllUsers } = require('../controller/admin.controller.js');
const adminRoutes = express.Router()
const authenticateJWT = require('../middleware/auth.js');


adminRoutes.get('/getAllUsers',authenticateJWT,getAllUsers)

module.exports =adminRoutes;