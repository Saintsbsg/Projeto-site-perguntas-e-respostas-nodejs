const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");


connection.authenticate().then(() =>{
    console.log("Conectado");
}).catch((msgErro) =>{
    console.log (msgErro);
});


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static('public'));


app.get("/", (req, res) =>{
    Pergunta.findAll({raw: true, order:[
        ["id", "DESC"]
    ]}).then(perguntas =>{
        console.log(perguntas);
        res.render("index", {
            perguntas: perguntas
        });
    })
    
    
});

app.get("/perguntar", (req, res) =>{
    res.render("perguntar");
})

app.post("/salvarpergunta", (req, res) =>{
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() =>{
        res.redirect("/");
    })
});

app.get("/pergunta/:id", (req, res) =>{
    let id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                 order:[
                ["id", "DESC"]
            ]}).then(respostas =>{
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            })
           
        }else{
            res.redirect("/");
        }
    })
    
});


app.post("/responder", (req, res) =>{
    let corpo = req.body.corpo;
    let pergunta = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: pergunta
    }).then(() =>{
        res.redirect("pergunta/pergunta"+ pergunta);
    })
})

app.listen(3001, (erro) => console.log("Rodando !"));