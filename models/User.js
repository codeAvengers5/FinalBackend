const bcryptjs = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_added: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile_pic: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'user',
      timestamps: false,
    }
  );

  // Hash password before saving to the database
  User.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await bcryptjs.hash(user.password, 10);
    }
  });

  return User;
};