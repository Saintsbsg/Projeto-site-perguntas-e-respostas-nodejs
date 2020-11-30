const { Sequelize } = require('sequelize');
const sequelize = require('sequelize');

const connection = new Sequelize("perguntas_respostas", "root", "79787753", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;