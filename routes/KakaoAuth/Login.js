const passport = require('passport');

const Login = passport.authenticate('kakao', {
	scope: ['profile_nickname', 'profile_image', 'account_email'],
});

module.exports = Login;
