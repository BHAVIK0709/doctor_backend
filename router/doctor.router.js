const express = require('express');
const doctorRoutes =  express.Router();
const { applydoctor ,getAllNoti ,deleteAllNoti,doctorInfo} = require('../controller/doctor.controller');
const authenticateJWT = require('../middleware/auth.js');

// for user 
doctorRoutes.post('/apply-doctor' ,authenticateJWT, applydoctor);
doctorRoutes.post('/get-all-notifications' ,authenticateJWT, getAllNoti);
doctorRoutes.post('/delete-all-notifications' ,authenticateJWT, deleteAllNoti);

//for doctor
doctorRoutes.get('/getDoctorInfo' ,authenticateJWT, doctorInfo);


module.exports = doctorRoutes;