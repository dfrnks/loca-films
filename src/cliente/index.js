const bcrypt = require('bcrypt');
const { db } = require('../database');
const { v4: uuidv4 } = require('uuid');
const email = require("email-validator");
var jwt = require('jsonwebtoken');

const saltRounds = 10;

class Cliente {
    constructor(nome, email, senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        let salt = bcrypt.genSaltSync(saltRounds);
        this.hash = bcrypt.hashSync(senha, salt);
    }

    save() {
        return new Promise((resolve, reject) => {
            if (!email.validate(this.email)) {
                reject({
                    message: "E-mail inválido"
                })

                return;
            }

            db().run("INSERT INTO cliente(idcliente, nome, email, senha) values (?,?,?,?)", [
                uuidv4(), this.nome, this.email, this.hash
            ], function (err) {
                if (err) {
                    reject(err)
                    return;
                }

                resolve(true)
            });
        })
    }

    static login(email, senha) {
        return new Promise((resolve, reject) => {
            var sql = "select * from cliente where email = ?"
            var params = [email]

            db().get(sql, params, (err, row) => {
                if (err) {
                    reject(err)
                    return;
                }

                if (!bcrypt.compareSync(senha, row.senha)) {
                    reject({message: "Senha incorreta!"})
                    return;
                }

                // cria o JWT
                var token = jwt.sign(
                    {
                        "idcliente": row.idcliente,
                        "nome": row.nome,
                        "email": row.email
                    },
                    '2Y%uZsm/HzKG%4z-Vft,mZ+oh[I].of5',
                    {
                        expiresIn: 3600 // 1hr
                    }
                );

                resolve({
                    "access_token": token,
                    "token_type": "Bearer",
                    "expires_in": 3600,
                    "data" : {
                        "nome": row.nome,
                        "email": row.email
                    }
                })
            });
        })
    }

    static logout() {
        return new Promise((resolve, reject) => {
            resolve({
                "access_token": null,
                "token_type": "Bearer",
                "expires_in": 3600,
                "data" : {}
            })
        })
    }
}

module.exports = Cliente;
