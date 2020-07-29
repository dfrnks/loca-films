const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Cliente = require('./src/cliente')
const Catalogo = require('./src/catalogo')
const { db } = require('./src/database');

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use(bodyParser.json());

app.post("/cliente", (req, res) => {
    new Cliente(
        req.body.nome,
        req.body.email,
        req.body.senha,
    ).save()
        .then(() => {
            res.json({ sucesso: true })
        })
        .catch((error) => {
            res.json({ mensagem: error.message, sucesso: false })
        })
})

app.post("/login", (req, res) => {



    res.json({
        sucesso: cliente.save()
    })
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
