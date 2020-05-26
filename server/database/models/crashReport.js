
import { name } from './modelsUtil';

module.exports = (sequelize, DataTypes) => {
  const CrashReport = sequelize.define(
    'CrashReport',
    {
      crash_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: name(),
      number_victims: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      location: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      user_id: DataTypes.INTEGER,
      image: DataTypes.STRING(150),
      video: DataTypes.STRING(150),
      message: DataTypes.STRING(1000)
    },
    {
      timestamps: false,
      tableName: 'crashReports'
    }
  );

  CrashReport.associate = ({ Users }) => {
    CrashReport.belongsTo(Users, {
      foreignKey: 'user_id'
    });
  };

  return CrashReport;
};
