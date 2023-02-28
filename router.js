const express = require('express');
const RootRoutes = express.Router();

const userRoutes = require('./Router/user.router');


RootRoutes.use('/', userRoutes);

module.exports = RootRoutes;  