const express = require('express');
const doctorRoutes =  express.Router();
const { applydoctor ,getAllNoti } = require('../controller/doctor.controller');
const authenticateJWT = require('../middleware/auth.js');


doctorRoutes.post('/apply-doctor' ,authenticateJWT, applydoctor)
doctorRoutes.post('/get-all-notifications' ,authenticateJWT, getAllNoti)


module.exports = doctorRoutes;