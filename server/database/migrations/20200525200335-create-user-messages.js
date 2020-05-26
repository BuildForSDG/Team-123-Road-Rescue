
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('UserMessages', {
    message_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    user_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users', // name of Source model
        key: 'user_id'
      }
    },
    message: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: new Date()
    }
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, _Sequelize) => queryInterface.dropTable('UserMessages')
};
