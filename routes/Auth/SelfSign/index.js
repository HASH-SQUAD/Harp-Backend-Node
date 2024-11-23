const express = require('express');
const router = express.Router();


const SignIn = require('./SignIn.js');
router.post('/signin', SignIn);

const SignUp = require('./SignUp.js');
router.post('/signup', SignUp);

module.exports = router;
