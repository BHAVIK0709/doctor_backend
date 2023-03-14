const express = require('express');
const RootRoutes = express.Router();

const userRoutes = require('./Router/user.router');
const doctorRoutes =require('./router/doctor.router');
const adminRoutes = require('./router/admin.router');


RootRoutes.use('/', userRoutes);
RootRoutes.use('/' ,doctorRoutes);
RootRoutes.use('/admin',adminRoutes);

module.exports = RootRoutes;  