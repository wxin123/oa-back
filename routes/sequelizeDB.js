var Sequelize = require('sequelize');

var sequelize = new Sequelize('oa', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: 'path/to/database.sqlite'
});

exports.sequelize = sequelize;