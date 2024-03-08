const { Sequelize } = require('sequelize');

const connectionString = 'mysql://fqnvrs3o4olzm9nz:w7x8siqu11po02rc@fojvtycq53b2f2kx.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/ib46uedfrgshh2nj';

const sequelize = new Sequelize(connectionString, {
  dialect: 'mysql'
});

module.exports = sequelize;