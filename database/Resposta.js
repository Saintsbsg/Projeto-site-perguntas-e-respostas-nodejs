const connection = require("./database");
const Sequelize = require("sequelize");

const Resposta = connection.define("respostas", {
    corpo:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false}).then(() =>{});

module.exports = Resposta;
