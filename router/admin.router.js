const express = require('express');
const { getAllUsers, getAllDoctors,changeStatus } = require('../controller/admin.controller.js');
const adminRoutes = express.Router()
const authenticateJWT = require('../middleware/auth.js');


adminRoutes.get('/getAllUsers',authenticateJWT,getAllUsers)
adminRoutes.get('/getAllDoctors',authenticateJWT,getAllDoctors)
adminRoutes.post('/changeStatus',authenticateJWT,changeStatus)


module.exports =adminRoutes;