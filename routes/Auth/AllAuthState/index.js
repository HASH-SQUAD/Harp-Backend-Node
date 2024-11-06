const express = require('express');
const router = express.Router();

const { validateToken } = require('../../../middlewares/AuthMiddleware.js');

const AllAuthState = require('./AllAuthState.js');
router.get('/', validateToken, AllAuthState);

module.exports = router;
