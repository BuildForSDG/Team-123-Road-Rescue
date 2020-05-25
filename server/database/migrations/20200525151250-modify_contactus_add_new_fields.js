
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'contactUs', // table name
      'email', // new field name
      {
        type: Sequelize.STRING(100),
        unique: false,
        allowNull: true,
        validate: {
          isEmail: true
        }
      }
    )
  ]),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, _Sequelize) => Promise.all([
    queryInterface.removeColumn('contactUs', 'email')

  ])
};
