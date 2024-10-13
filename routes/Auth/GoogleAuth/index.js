const express = require('express');
const passport = require('passport');
const router = express.Router();
const session = require('express-session');
const {
	generateAccessToken,
	generateRefreshToken,
} = require('../../../tokens/jwt');

router.use(session({ secret: 'cats' }));
router.use(passport.initialize());
router.use(passport.session());
router.use(express.json());
require('./auth');

const Login = require('./Login.js');
router.get('/google', Login);

const Callback = require('./Callback.js');
router.get('/google/callback', Callback, async (req, res) => {
	try {
		const accessToken = generateAccessToken(req.user.dataValues.email);
		const refreshToken = req.user.refreshToken;

		res.redirect(`${process.env.CLIENT_ORIGIN}/auth/google/callback?accessToken=${accessToken}&refreshToken=${refreshToken}`);
	} catch (error) {
		console.error('Error during callback processing:', error);
		res.redirect(`${process.env.CLIENT_ORIGIN}/login`);
	}
});


const Fail = require('./Fail.js');
router.get('/google/failure', Fail);

const AuthState = require('./AuthState.js');
const { validateToken } = require('../../../middlewares/AuthMiddleware.js');
router.get('/google/authstate', validateToken, AuthState);

const Logout = require('./Logout.js');
router.delete('/google/logout', validateToken, Logout);

const Refresh = require('./Refresh.js');
router.post('/google/token', Refresh);

module.exports = router;
