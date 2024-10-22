module.exports = (sequelize, DataTypes) => {
  const Community = sequelize.define(
    'Community',
    {
      communityId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      des: {
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
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );

  Community.associate = models => {
    Community.belongsTo(models.Users, { foreignKey: 'userId', as: 'creator' });
    Community.belongsToMany(models.Users, { through: models.Wish, foreignKey: 'communityId', as: 'wishingUsers' });
    Community.hasMany(models.Wish, { foreignKey: 'communityId' });
  };

  return Community;
};
