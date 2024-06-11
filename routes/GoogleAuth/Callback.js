const passport = require('passport');

const Callback = passport.authenticate('google', {
  failureRedirect: '/auth/failure',
  session: true,
});

module.exports = Callback;
