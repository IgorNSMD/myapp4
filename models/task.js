const { Sequelize, Model, DataTypes } = require('sequelize');

var db = require('../config/db.js');

const Task = db.define('tasks',{
  taskName: {
    type: DataTypes.STRING(50),
    allowNull:false
  },
  createDate: {
    type: DataTypes.DATE,
    allowNull:true
  },
  completedDate: {
    type: DataTypes.DATE,
    allowNull:true
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:false
  }
});

module.exports = Task;