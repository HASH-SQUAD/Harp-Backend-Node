const passport = require('passport');

const Callback = passport.authenticate('kakao', {
	failureRedirect: '/auth/kakao/failure',
	session: true,
});

module.exports = Callback;
