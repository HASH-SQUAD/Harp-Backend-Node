module.exports = (sequelize, DataTypes) => {
	const Survey = sequelize.define(
		'Survey',
		{
			surveyId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			question1: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			question2: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			question3: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			etc: {
				type: DataTypes.TEXT,
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
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
	);

	Survey.associate = models => {
		Survey.belongsTo(models.Users, {
			foreignKey: 'userId',
			targetKey: 'userId',
		});
	};

	return Survey;
};
