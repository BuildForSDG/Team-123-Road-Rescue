
module.exports = (sequelize, DataTypes) => {
  const UserMessages = sequelize.define('UserMessages', {
    message_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    message: DataTypes.STRING(1000)
  }, {

    timestamps: false,
    tableName: 'UserMessages'
  });


  UserMessages.associate = ({ Users }) => {
    UserMessages.belongsTo(Users, {
      foreignKey: 'user_id'
    });
  };

  return UserMessages;
};
