const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      address: DataTypes.STRING(100),
      city: DataTypes.STRING(100),
      state: DataTypes.STRING(100),
      postal_code: DataTypes.STRING(100),
      mob_phone: DataTypes.STRING(100)
    },
    {
      underscored: true,
      tableName: 'Users',
      timestamps: false
    }
  );

  Users.beforeCreate(async (user) => {
    // eslint-disable-next-line no-param-reassign
    user.password = await user.generatePasswordHash();
  });

  Users.beforeUpdate(async (user) => {
    // eslint-disable-next-line no-param-reassign
    user.password = await user.generatePasswordHash();
  });

  Users.prototype.generatePasswordHash = async function generatePasswordHash() {
    const saltRounds = 8;
    return bcrypt.hash(this.password, saltRounds);
  };

  Users.prototype.validatePassword = async function validatePassword(password) {
    return bcrypt.compare(password, this.password);
  };

  Users.prototype.getSafeDataValues = function getSafeDataValues() {
    const { password, ...data } = this.dataValues;
    return data;
  };

  Users.associate = ({ UserMessage }) => {
    // associations can be defined here
    Users.hasMany(UserMessage, {
      foreignKey: 'user_id'
    });
  };

  Users.associate = ({ CrashReport }) => {
    // associations can be defined here
    Users.hasMany(CrashReport, {
      foreignKey: 'user_id'
    });
  };
  return Users;
};
