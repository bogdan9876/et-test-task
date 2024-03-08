const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Medicament = sequelize.define('Medicament', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.INTEGER
  },
  image: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
    store: {
    type: DataTypes.STRING}
},
    {
  timestamps: false
});

module.exports = Medicament;
