module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    'Comments',
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
      isCommentForComment: {
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

  Comments.associate = models => {
    Comments.belongsTo(models.Users, { foreignKey: 'userId', as: 'author' });
    Comments.belongsTo(models.Community, { foreignKey: 'communityId', as: 'Communities' });
    Comments.hasMany(models.Comments, { foreignKey: 'parentComment', as: 'replies' });
    Comments.belongsTo(models.Comments, { foreignKey: 'parentComment', as: 'parentComments' });
  };

  return Comments;
};