const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware');
const userAuthRoute = require('../auth/userAuthRouter');
const companyAuthRoute = require('../auth/companyAuthRouter');
const userRoute = require('../routes/user-router.js');
const companyRoute = require('../routes/company-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/', <h1>Welcome to Droom API.</h1>)
server.use('/api/auth/users', userAuthRoute);
server.use('/api/auth/companies', companyAuthRoute);
server.use('/api/users' ,authenticate, userRoute);
server.use('/api/companies', authenticate, companyRoute);


module.exports = server;