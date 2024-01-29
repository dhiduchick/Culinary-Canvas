//requireing sequelize functionality and dotenv configuration
const Sequelize = require('sequelize');
require('dotenv').config();

//Determining where to listen-URL or local
let sequelize;

if(process.env.CULINARYDB_URL) {
    console.log('Connecting to Culinary Canvas')
    sequelize = new Sequelize(process.env.CULINARYDB_URL);
} else {
    console.log('Connecting to local mysql')
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host:'localhost',
            dialect: 'mysql',
            port:3306
        }
    );
}

module.exports = sequelize;