const passport = require('passport');

const Callback = passport.authenticate('google', {
  successRedirect: '/auth/protected',
  failureRedirect: '/auth/failure',
});

module.exports = Callback;
