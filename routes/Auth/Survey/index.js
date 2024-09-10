const express = require('express');
const router = express.Router();

const { validateToken } = require('../../../middlewares/AuthMiddleware.js');

const Survey = require('./Survey.js');
router.post('/', validateToken, Survey);

module.exports = router;
