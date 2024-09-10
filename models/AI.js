module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define(
    'AI',
    {
      aiId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      conversation: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      locationData: {
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
