module.exports = (sequelize, DataType) => {

  // JB: schema deprecated in v4+ => ES6 classes
  // https://sequelize.org/v4/manual/tutorial/upgrade-to-v4.html
  /*
  const Tasks = sequelize.define(
    'Tasks',
    {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      done: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      classMethods: {
        associate: (models) => {
          Tasks.belongsTo(models.Users)
        }
      }
    }
  )
  */

  const Tasks = sequelize.define(
    'Tasks',
    {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      done: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }
  )

  Tasks.associate = (models) => {
    Tasks.belongsTo(models.Users)
  }

  return Tasks
}
