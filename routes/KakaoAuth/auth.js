// routes/GoogleAuth/auth.js (or a similar file for Kakao auth)
const passport = require('passport');
const { Users } = require('../../models');
const KakaoStrategy = require('passport-kakao').Strategy;
const {
	generateAccessToken,
	generateRefreshToken,
} = require('../../tokens/jwt');

const getProfile = profile => {
	return {
		userId: profile._json.id,
		email: profile._json.kakao_account.email,
		name: profile._json.kakao_account.profile.nickname,
		profileImg: profile._json.kakao_account.profile.thumbnail_image_url,
		provider: 'kakao',
	};
};

passport.use(
	new KakaoStrategy(
		{
			clientID: process.env.KAKAO_CLIENT_ID,
			callbackURL: `${process.env.SERVER_ORIGIN}/auth/kakao/callback`,
			passReqToCallback: true,
		},
		async (request, accessToken, refreshToken, profile, done) => {
			try {
				const existingUser = await Users.findOne({
					where: { userId: profile.id },
				});

				if (!existingUser) {
					const profileData = getProfile(profile);
					if (!profileData.email) {
						return done(null, false, {
							message: 'No email associated with this account',
						});
					}

					const existingEmailAccount = await Users.findOne({
						where: { email: profileData.email },
					});

					if (!existingEmailAccount) {
						const newAccount = await Users.create(profileData);
						return done(null, newAccount);
					}
					return done(null, existingEmailAccount);
				}
				return done(null, existingUser);
			} catch (err) {
				console.log(err);
				return done(err, null);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.userId);
});

passport.deserializeUser((id, done) => {
	Users.findByPk(id)
		.then(user => {
			done(null, user);
		})
		.catch(error => done(error));
});
