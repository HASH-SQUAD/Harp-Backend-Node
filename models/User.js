module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define(
		'Users',
		{
			userId: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			nickname: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			gender: {
				type: DataTypes.ENUM('male, female'),
				allowNull: true,
			},
			birthdate: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			refreshToken: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			authority: {
				type: DataTypes.ENUM('admin, user'),
				allowNull: true,
			},
			profileImg: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			provider: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			paranoid: true,
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
	);

	return Users;
};
