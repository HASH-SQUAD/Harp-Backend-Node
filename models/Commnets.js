module.exports = (sequelize, DataTypes) => {
  const Commnets = sequelize.define(
    'Commnets',
    {
      commnetsId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      des: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isCommentForCommnet: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      parentComment: {
        type: DataTypes.INTEGER,
        allowNull: true
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
          model: 'Communities',
          key: 'communityId',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      }
    },
    {
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );

  Commnets.associate = models => {
    Commnets.belongsTo(models.Users, { foreignKey: 'userId', as: 'author' });
    Commnets.belongsTo(models.Community, { foreignKey: 'communityId', as: 'Communities' });
    Commnets.hasMany(models.Commnets, { foreignKey: 'parentComment', as: 'replies' });
    Commnets.belongsTo(models.Commnets, { foreignKey: 'parentComment', as: 'parentCommnets' });
  };

  return Commnets;
};