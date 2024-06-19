const passport = require('passport');
const { Users } = require('../../models');
const KakaoStrategy = require('passport-kakao').Strategy;
const {
	generateAccessToken,
	generateRefreshToken,
} = require('../../tokens/jwt');
const { where } = require('sequelize');

passport.use(
	new KakaoStrategy(
		{
			clientID: process.env.KAKAO_CLIENT_ID,
			callbackURL: `${process.env.SERVER_ORIGIN}/auth/kakao/callback`,
			passReqToCallback: true,
		},
		async (request, accessToken, refreshToken, profile, done) => {
			try {
				const user = await Users.findOne({
					where: { userId: profile.id },
				});
				console.log(profile);

				if (!user) {
					const profileData = {
						userId: profile._json.id,
						email: profile._json.kakao_account.email,
						name: profile._json.kakao_account.profile.nickname,
						profileImg: profile._json.kakao_account.profile.thumbnail_image_url,
						provider: 'kakao',
					};
					if (!profileData.email) {
						return done(null, false, {
							message: '이메일이 존재하지 않음',
						});
					}

					const newRefreshToken = generateRefreshToken(profile.id);
					const newAccount = await Users.create({
						...profileData,
						refreshToken: newRefreshToken,
					});
					return done(null, newAccount);
				} else {
					const newRefreshToken = generateRefreshToken(profile.id);
					console.log(newRefreshToken);
					await user.update({ refreshToken: newRefreshToken });
					return done(null, user);
				}
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