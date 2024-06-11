const passport = require('passport');
const { Users } = require('../models');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const getProfile = (profile) => {
	const { id, displayName, emails, provider, picture } = profile;
	if (emails?.length) {
		const email = emails[0].value;
		return {
			googleId: id,
			email: email,
			name: displayName,
			profileImg: picture,
			provider: provider,
		};
	}
	return null;
};

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:3000/auth/google/callback',
			passReqToCallback: true,
		},
		async (request, accessToken, refreshToken, profile, done) => {
			// console.log(profile);
			// return done(null, profile);

			try {
				const existingGoogleAccount = await Users.findOne({
					where: { googleId: profile.id },
				});

				if (!existingGoogleAccount) {
					const existingEmailAccount = await Users.findOne({
						where: { email: getProfile(profile).email },
					});

					if (!existingEmailAccount) {
						const newAccount = await Users.create(
							getProfile(profile)
						);
						return done(null, newAccount);
					}
					return done(null, existingEmailAccount);
				}
				return done(null, existingGoogleAccount);
			} catch (err) {
				console.log(err);
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