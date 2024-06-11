const passport = require('passport');

const Login = passport.authenticate('google', { scope: ['email', 'profile'] });

module.exports = Login;
