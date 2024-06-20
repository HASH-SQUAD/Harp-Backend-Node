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
				type: DataTypes.DATE,
				allowNull: true,
			},
			endDate: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			data: {
				type: DataTypes.TEXT,
				get: function() {
					try {
						return JSON.parse(this.getDataValue('data'));
					} catch (error) {
						return this.getDataValue('data');
					}
				},
				set: function(value) {
					this.setDataValue('data', JSON.stringify(value));
				},
				allowNull: true,
			},
			userId: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
	);

	Plan.associate = models => {
		Plan.belongsTo(models.Users, { foreignKey: 'userId', targetKey: 'userId' });
	};

	return Plan;
};
