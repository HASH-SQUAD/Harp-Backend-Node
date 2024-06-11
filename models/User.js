module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define('Users', {
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
		sex: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		birthdate: {
			type: DataTypes.STRING,
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
	});

	return Users;
};
