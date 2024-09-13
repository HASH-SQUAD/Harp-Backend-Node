module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define(
    'RecommendPlan',
    {
      RecommendPlanId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      mainImg: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      data: {
        type: DataTypes.JSON,
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

  Plan.associate = models => {
    Plan.belongsTo(models.Users, { foreignKey: 'userId', targetKey: 'userId' });
  };

  return Plan;
};
