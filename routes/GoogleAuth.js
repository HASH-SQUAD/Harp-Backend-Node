const express = require('express');
const passport = require('passport');
const router = express.Router();
const session = require('express-session');

router.use(session({ secret: 'cats' }));
router.use(passport.initialize());
router.use(passport.session());
router.use(express.json());

require('./auth');

const isLoggedIn = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		res.sendStatus(401);
	}
};

router.get(
	'/google',
	passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: '/auth/protected',
		failureRedirect: '/auth/failure',
	})
);

router.get('/failure', (req, res) => {
	res.send('User Failure');
});

router.get('/protected', isLoggedIn, (req, res) => {
	res.send(`
		<h1>Hello User!</h1>
		<h3>UR Name : ${req.user.name}</h3>
		<h3>UR Email : ${req.user.email}</h3>
		<h3>UR GoogleID : ${req.user.googleId}</h3>
		<img src=${req.user.profileImg} alt="ProfileIMG" width='400' height='400'/>
		<h3>Provider : ${req.user.provider}</h3>
		`);
});

router.get('/google/logout', (req, res, next) => {
	req.logOut((err) => {
		if (err) {
			return next(err);
		} else {
			console.log('로그아웃됨.');
			res.redirect('/');
		}
	});
});

module.exports = router;
