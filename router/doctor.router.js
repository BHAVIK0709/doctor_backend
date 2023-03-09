const express = require('express');
const doctorRoutes =  express.Router();
const { applydoctor  } = require('../controller/doctor.controller');
const authenticateJWT = require('../middleware/auth.js');


doctorRoutes.post('/apply-doctor' ,authenticateJWT, applydoctor)

module.exports = doctorRoutes;