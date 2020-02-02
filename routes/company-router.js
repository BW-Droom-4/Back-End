const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Companies = require('../helpers/company-model');
const {jwtSecret} = require('../config/tokens');

module.exports = router;
