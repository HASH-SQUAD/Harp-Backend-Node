module.exports = (sequelize, DataTypes) => {
  const Wish = sequelize.define(
    'Wish',
    {
      wishId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      communityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Community',
          key: 'communityId',
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

  Wish.associate = models => {
    Wish.belongsTo(models.Users, { foreignKey: 'userId' });
    Wish.belongsTo(models.Community, { foreignKey: 'communityId' });
  };
  
  return Wish;
};
