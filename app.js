const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Cliente = require('./src/cliente')
const Catalogo = require('./src/catalogo')
const { db } = require('./src/database');
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());

function checkJWT(req, res, next){
    let token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ auth: false, message: 'No token provided.' });
    }

    token = token.split(' ')

    if (token[0] !== 'Bearer') {
        return res.status(401).json({ auth: false, message: 'Incorrect token type.' });
    }

    jwt.verify(token[1],'2Y%uZsm/HzKG%4z-Vft,mZ+oh[I].of5', function(err, decoded) {
        if (err) {
            return res.status(500).json({ auth: false, message: err.message });
        }

        req.idcliente = decoded.idcliente;
        next();
    });
}

app.post('/cliente', (req, res) => {
    Cliente
        .save(req.body.nome, req.body.email, req.body.senha)
        .then(() => {
            res.json({ sucesso: true })
        })
        .catch((error) => {
            res.json({ mensagem: error.message, sucesso: false })
        })
})

app.post('/login', (req, res) => {
    Cliente
        .login(req.body.email, req.body.senha)
        .then((success) => {
            res.json(success)
        })
        .catch((error) => {
            res.json({ mensagem: error.message, sucesso: false })
        })
})

app.post('/logout', checkJWT, (req, res) => {
    Cliente
        .logout()
        .then((success) => {
            res.json(success)
        })
        .catch((error) => {
            res.json({ mensagem: error.message, sucesso: false })
        })
})

app.get('/catalogo', checkJWT, (req, res) => {
    if (req.query.titulo) {
        Catalogo.get(req.query.titulo)
            .then((success) => {
                res.json(success)
            })
            .catch((error) => {
                res.json({ mensagem: error.message, sucesso: false })
            })

        return;
    }

    Catalogo.getAll()
        .then((success) => {
            res.json(success)
        })
        .catch((error) => {
            res.json({ mensagem: error.message, sucesso: false })
        })
})

app.put('/locar/:idimdb', checkJWT, (req, res) => {
    Catalogo
        .locar(req.idcliente, req.params.idimdb)
        .then(() => {
            res.json({ sucesso: true })
        })
        .catch((error) => {
            res.json({ mensagem: error.message, sucesso: false })
        })
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
