const express = require('express');
const passport = require('passport');
const router = express.Router();
const session = require('express-session');
const {
	generateAccessToken,
	generateRefreshToken,
} = require('../../tokens/jwt');

router.use(session({ secret: 'cats' }));
router.use(passport.initialize());
router.use(passport.session());
router.use(express.json());
require('./auth');

const Login = require('./Login.js');
router.get('/kakao', Login);

const Callback = require('./Callback.js');
router.get('/kakao/callback', Callback, (req, res) => {
	const accessToken = generateAccessToken(req.user.dataValues.email);
	const refreshToken = req.user.refreshToken;
	res.status(200).send(
		authUtil.successTrue(200, '카카오로그인 성공', {
			accessToken: accessToken,
			refreshToken: refreshToken,
		})
	);
});

const Fail = require('./Fail.js');
router.get('/kakao/failure', Fail);

const AuthState = require('./AuthState.js');
const { validateToken } = require('../../middlewares/AuthMiddleware.js');
router.get('/kakao/authstate', validateToken, AuthState);

const Logout = require('./Logout.js');
router.get('/kakao/logout', Logout);

const Refresh = require('./Refresh.js');
const authUtil = require('../../response/authUtil.js');
router.post('/kakao/token', Refresh);

module.exports = router;
