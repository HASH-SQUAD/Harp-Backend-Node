module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define('Users', {
		googleId: {
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
		profileImg: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		provider: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	return Users;
};
