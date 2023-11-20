/* Below code is replaced with Sequelize library
const mysql = require('mysql2')
const pool = mysql.createPool({host: 'localhost', user: 'root', password: 'fno@123', database: 'shopping-website'})
module.exports = pool.promise(); */

const Sequelize = require('sequelize');

const sequelize = new Sequelize('shopping-website', 'root', 'fno@123', { dialect: 'mysql', host: 'localhost' });

module.exports = sequelize;