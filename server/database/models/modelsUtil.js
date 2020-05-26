
const name = (DataTypes) => ({
  type: DataTypes.STRING(100),
  allowNull: false,
  validate: {
    notEmpty: true
  }
});


module.exports = {
  name
};
