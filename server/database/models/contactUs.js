
import { name } from './modelsUtil';

module.exports = (sequelize, DataTypes) => {
  const ContactUs = sequelize.define(
    'ContactUs',
    {
      message_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: name(),
      user_id: DataTypes.INTEGER
    },
    {
      timestamps: false,
      tableName: 'contactUs'
    }
  );

  ContactUs.associate = ({ Users }) => {
    ContactUs.belongsTo(Users, {
      foreignKey: 'user_id'
    });
  };


  return ContactUs;
};
