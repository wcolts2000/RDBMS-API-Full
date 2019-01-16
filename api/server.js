const express = require('express');
const configMiddleware = require('../config/middleware');

const cohortRouter = require("../cohortsRoutes/cohortsRouter");
const studentRouter = require("../studentsRoutes/studentsRouter");

const server = express();

configMiddleware(server);

server.use('/api/cohorts', cohortRouter);
server.use('/api/students', studentRouter);

module.exports = server;