
const createdAt = (Sequelize) => ({
  allowNull: false,
  type: Sequelize.DATE,
  defaultValue: new Date()
});


const updatedAt = (Sequelize) => ({
  allowNull: false,
  type: Sequelize.DATE,
  defaultValue: new Date()
});

module.exports = {
  updatedAt,
  createdAt
};
