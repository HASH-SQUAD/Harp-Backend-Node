const passport = require('passport');
const {Users} = require('../../../models');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const {generateRefreshToken} = require('../../../tokens/jwt');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_ORIGIN}/auth/google/callback`,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        let user = await Users.findOne({
          where: {email: profile.emails[0].value},
        });

        if (!user) {
          const profileData = {
            authId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            profileImg: profile.photos[0].value,
            newAccount: true,
            authority: false,
            provider: 'google'
          };

          if (!profileData.email) {
            return done(null, false, {
              message: '이메일이 존재하지 않음',
            });
          }
          const newRefreshToken = generateRefreshToken(profile.emails[0].value);
          user = await Users.create({
            ...profileData,
            refreshToken: newRefreshToken,
          });
        } else {
          const newRefreshToken = generateRefreshToken(profile.emails[0].value);
          await user.update({refreshToken: newRefreshToken});
        }

        return done(null, user);
      } catch (err) {
        console.log(err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findByPk(id)
    .then(user => {
      done(null, user);
    })
    .catch(error => done(error));
});
