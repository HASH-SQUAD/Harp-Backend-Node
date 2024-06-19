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
				get: function() {
					try {
						return JSON.parse(this.getDataValue('question1'));
					} catch (error) {
						return this.getDataValue('question1');
					}
				},
				set: function(value) {
					this.setDataValue('question1', JSON.stringify(value));
				},
				allowNull: true,
			},
			question2: {
				type: DataTypes.TEXT,
				get: function() {
					try {
						return JSON.parse(this.getDataValue('question2'));
					} catch (error) {
						return this.getDataValue('question2');
					}
				},
				set: function(value) {
					this.setDataValue('question2', JSON.stringify(value));
				},
				allowNull: true,
			},
			etc: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
		},
		{
			paranoid: false,
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
