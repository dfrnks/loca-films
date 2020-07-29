const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Cliente = require('./cliente')
const Catalogo = require('./catalogo')
const { db } = require('./db')

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use(bodyParser.json());

app.post("/cliente", (req, res) => {
    let sql = `SELECT DISTINCT Name name FROM playlists
           ORDER BY name`;

    db().all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row.name);
        });
    });

    let cliente = new Cliente(
        req.body.nome,
        req.body.email,
        req.body.senha,
    )

    res.json({
        sucesso: cliente.save()
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
