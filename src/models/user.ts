const { sq } = require('../database/db')
const { DataTypes, Column } = require('sequelize')

const User = sq.define('users', {
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  full_name: {
    type: DataTypes.TEXT,
  },

  password: {
    type: DataTypes.TEXT,
  },

  username: {
    type: DataTypes.TEXT,
  },
})

module.exports = User
