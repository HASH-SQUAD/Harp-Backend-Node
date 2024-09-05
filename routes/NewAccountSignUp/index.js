const express = require('express');
const router = express.Router();

const { validateToken } = require('../../middlewares/AuthMiddleware.js');

const NewAccountSignUp = require('./NewAccountSignUp.js');
router.put('/', validateToken, NewAccountSignUp);

module.exports = router;
