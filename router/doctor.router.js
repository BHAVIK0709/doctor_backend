const express = require('express');
const doctorRoutes =  express.Router();
const { applydoctor ,getAllNoti ,deleteAllNoti,doctorInfo, updateProfile, showAllDoctors, getDoctorById,} = require('../controller/doctor.controller');
const authenticateJWT = require('../middleware/auth.js');

// for user 
doctorRoutes.post('/apply-doctor' ,authenticateJWT, applydoctor);
doctorRoutes.post('/get-all-notifications' ,authenticateJWT, getAllNoti);
doctorRoutes.post('/delete-all-notifications' ,authenticateJWT, deleteAllNoti);

//for doctor
doctorRoutes.post('/getDoctorInfo' ,authenticateJWT, doctorInfo);
//post update doctor profile
doctorRoutes.post('/updateDoctorProfile',authenticateJWT, updateProfile);
//get al doctors
doctorRoutes.get('/showAllDoctors',authenticateJWT, showAllDoctors);
// get single doc info
doctorRoutes.post('/getDocById',authenticateJWT,getDoctorById)


module.exports = doctorRoutes;  