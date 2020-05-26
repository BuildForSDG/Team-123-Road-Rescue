import { createdAt, updatedAt } from './migrationutil';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('crashReports', {
    crash_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    number_victims: {
      type: Sequelize.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    location: {
      type: Sequelize.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users', // name of Source model
        key: 'user_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    image: Sequelize.STRING(150),
    video: Sequelize.STRING(150),
    message: Sequelize.STRING(1000),
    createdAt: createdAt(),
    updatedAt: updatedAt()
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, _Sequelize) => queryInterface.dropTable('crashReports')
};
