module.exports = (sequelize, DataTypes) => {
	const Plan = sequelize.define(
		'Plan',
		{
			planId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			planName: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			mainImg: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			startDate: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			endDate: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			impressions: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Users',
					key: 'userId',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
		},
		{
			paranoid: true,
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
	);

	Plan.associate = models => {
		Plan.belongsTo(models.Users, { foreignKey: 'userId', targetKey: 'userId' });
	};

	return Plan;
};
