const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { db } = require('../database');

const saltRounds = 10;

class Cliente {
    static save(nome, email, senha) {
        return new Promise((resolve, reject) => {
            if (!emailValidator.validate(email)) {
                reject({
                    message: 'E-mail inválido'
                })

                return;
            }

            let hash = bcrypt.hashSync(senha, bcrypt.genSaltSync(saltRounds));
            let sql = 'INSERT INTO cliente(idcliente, nome, email, senha) values (?,?,?,?)';
            let params = [ uuidv4(), nome, email, hash ]

            db().run(sql, params, function (err) {
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
            let sql = 'select * from cliente where email = ?'
            let params = [email]

            db().get(sql, params, (err, row) => {
                if (err) {
                    reject(err)
                    return;
                }

                if (!row || !bcrypt.compareSync(senha, row.senha)) {
                    reject({message: 'Usuário ou senha incorreta!'})
                    return;
                }

                // cria o JWT
                let token = jwt.sign(
                    {
                        'idcliente': row.idcliente,
                        'nome': row.nome,
                        'email': row.email
                    },
                    '2Y%uZsm/HzKG%4z-Vft,mZ+oh[I].of5',
                    {
                        expiresIn: 300 // 5min
                    }
                );

                resolve({
                    'access_token': token,
                    'token_type': 'Bearer',
                    'expires_in': 300,
                    'data' : {
                        'nome': row.nome,
                        'email': row.email
                    }
                })
            });
        })
    }

    static logout() {
        return new Promise((resolve, reject) => {
            resolve({
                'access_token': null,
                'token_type': 'Bearer',
                'expires_in': 300,
                'data' : {}
            })
        })
    }
}

module.exports = Cliente;
