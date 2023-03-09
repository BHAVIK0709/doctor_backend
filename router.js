const express = require('express');
const RootRoutes = express.Router();

const userRoutes = require('./Router/user.router');
const doctorRoutes =require('./router/doctor.router')


RootRoutes.use('/', userRoutes);
RootRoutes.use('/' ,doctorRoutes);

module.exports = RootRoutes;  