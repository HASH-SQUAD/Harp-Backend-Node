const express = require('express');
const passport = require('passport');
const router = express.Router();
const session = require('express-session');
const { generateAccessToken, generateRefreshToken } = require('../../tokens/jwt');

router.use(session({ secret: 'cats' }));
router.use(passport.initialize());
router.use(passport.session());
router.use(express.json());
require('./auth');

const Login = require('./Login.js');
router.get('/google', Login);

const Callback = require('./Callback.js');
router.get('/google/callback', Callback, (req, res) => {
  const accessToken = generateAccessToken(req.user.id);
  const refreshToken = generateRefreshToken(req.user.id);
  res.json({ accessToken, refreshToken });
});

const Fail = require('./Fail.js');
router.get('/failure', Fail);

const AuthState = require('./AuthState.js');
const { validateToken } = require('../../middlewares/AuthMiddleware.js');
router.get('/authstate', validateToken, AuthState);

const Logout = require('./Logout.js');
router.get('/google/logout', Logout);

const Refresh = require('./Refresh.js');
router.post('/token', Refresh);

module.exports = router;
