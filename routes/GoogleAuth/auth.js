const passport = require('passport');
const { Users } = require('../../models');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { generateAccessToken, generateRefreshToken } = require('../../tokens/jwt');

const getProfile = (profile) => {
  const { id, displayName, emails, provider, picture } = profile;
  if (emails?.length) {
    const email = emails[0].value;
    return {
      userId: id,
      email,
      name: displayName,
      profileImg: picture,
      provider,
    };
  }
  return null;
};

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
        let user = await Users.findOne({ where: { userId: profile.id } });

        if (!user) {
          const profileData = {
            userId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            profileImg: profile.photos[0].value,
            provider: 'google',
        };
            const newRefreshToken = generateRefreshToken(profile.id);
            user = await Users.create({ ...profileData, refreshToken: newRefreshToken });
        } else {
            const newRefreshToken = generateRefreshToken(profile.id);
            await user.update({ refreshToken: newRefreshToken });
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
    .then((user) => {
      done(null, user);
    })
    .catch((error) => done(error));
});
