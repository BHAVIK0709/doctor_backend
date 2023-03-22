const express = require('express');
const userRoutes =  express.Router();
const {  addUser,getUser,loginUser, authContoller, bookAppointmentCtrl, bookingAvailityCtrl } = require('../controller/user.controller.js');
const authenticateJWT = require('../middleware/auth.js');

userRoutes.post('/signup',addUser );
userRoutes.get('/getUsers',getUser);
userRoutes.post('/login',loginUser);
userRoutes.get('/getUserData' ,authenticateJWT,authContoller)


//Booking Appointment
userRoutes.post('/book-apponitment',authenticateJWT, bookAppointmentCtrl);

//Booking availibility
userRoutes.post('/booking-availibility',authenticateJWT,bookingAvailityCtrl);

module.exports = userRoutes;