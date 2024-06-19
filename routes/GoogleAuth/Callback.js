const passport = require('passport');

const Callback = passport.authenticate('google', {
  failureRedirect: '/auth/google/failure',
  session: true,
});

module.exports = Callback;
