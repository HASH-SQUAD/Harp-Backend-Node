const express = require('express');
const passport = require('passport');
const router = express.Router();
const session = require('express-session');

router.use(session({ secret: 'cats' }));
router.use(passport.initialize());
router.use(passport.session());
router.use(express.json());
require('./auth');

const Login = require('./Login.js');
router.get('/google', Login);

const Callback = require('./Callback.js');
router.get('/google/callback', Callback);

const Fail = require('./Fail.js');
router.get('/failure', Fail);

const Protected = require('./Protected.js');
router.get('/protected', Protected);

const Logout = require('./Logout.js');
router.get('/google/logout', Logout);

module.exports = router;