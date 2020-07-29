const bcrypt = require('bcrypt');
const { db } = require('./../db');
const { v4: uuidv4 } = require('uuid');
const email = require("email-validator");

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
            } else {
                db().run("INSERT INTO cliente(idcliente, nome, email, senha) values (?,?,?,?)", [
                    uuidv4(), this.nome, this.email, this.hash
                ], function (err) {
                    if (err) {
                        console.log(err.message);
                        reject(err)
                    }

                    resolve(true)
                });
            }
        })
    }

    static login(email, senha) {
        bcrypt.compareSync(senha, hash); // true
    }

    static logout() {

    }
}

module.exports = Cliente;
