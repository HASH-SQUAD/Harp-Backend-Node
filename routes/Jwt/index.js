const express = require('express');
const router = express.Router();

const Jwt = require('./Jwt.js');
router.post('/', Jwt);

module.exports = router;
