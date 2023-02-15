const bcrypt = require('bcrypt')
// const crypto = require('crypto')

module.exports = (sequelize, DataType) => {

  // JB: schema deprecated in v4+ => ES6 classes
  // https://sequelize.org/v4/manual/tutorial/upgrade-to-v4.html
  /*
  const Users = sequelize.define(
    'Users',
    {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataType.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
    },
    {
      hooks: {
        beforeCreate(user) {
          const salt = bcrypt.genSaltSync()
          user.password = bcrypt.hashSync(user.password, salt)
        }
      },
      classMethods: {
        associate(models) {
          Users.hasMany(models.Tasks)
        },
        isPassword(encodedPassword, password) {
          return bcrypt.compareSync(password, encodedPassword)
        },
      },
    }
  )
  */

  const Users = sequelize.define(
    'Users',
    {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataType.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
    },
    {
      hooks: {
        beforeCreate(user) {
          const salt = bcrypt.genSaltSync()
          user.password = bcrypt.hashSync(user.password, salt)
        }
      },
    }
  )

  Users.associate = (models) => {
    Users.hasMany(models.Tasks)
  }

  Users.isPassword = (encodedPassword, password) => {
    return bcrypt.compareSync(password, encodedPassword)
  }

  return Users
}
