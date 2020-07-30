const { db } = require('../database');
const { v4: uuidv4 } = require('uuid');

class Catalogo{
    static getAll() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT idimdb, titulo, diretor FROM catalogo WHERE locado = 0 GROUP BY idimdb'

            db().all(sql, [], (err, rows) => {
                if (err) {
                    reject(err)
                    return;
                }

                resolve(rows)
            })
        })
    }

    static get(titulo) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT idimdb, titulo, diretor FROM catalogo WHERE locado = 0 AND titulo LIKE ? GROUP BY idimdb'

            db().all(sql, ['%' + titulo + '%'], (err, rows) => {
                if (err) {
                    reject(err)
                    return;
                }

                resolve(rows)
            })
        })
    }

    static locar(idcliente, idimdb) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM catalogo WHERE idimdb = ? AND locado = 0 limit 1'

            db().get(sql, [ idimdb ], (err, row) => {
                if (err) {
                    reject(err)
                    return;
                }

                if (!row) {
                    reject({message: 'Filme indisponível!'})
                    return;
                }

                // Aloca o filme para o cliente
                let update = 'UPDATE catalogo set locado = 1 WHERE idcatalogo = ?'

                db().run(update, [ row.idcatalogo ], function (err) {
                    if (err) {
                        reject(err)
                        return;
                    }

                    // Insere o registro da locação
                    let insert = `
                        INSERT INTO locacao (idlocacao, idcliente, idcatalogo, dthr_locacao, dthr_devolucao) 
                        VALUES (?,?,?,?,?)
                    `

                    let params = [
                        uuidv4(),
                        idcliente,
                        row.idcatalogo,
                        Date.now()
                    ]

                    db().run(insert, params, function (err) {
                        if (err) {
                            reject(err)
                            return;
                        }

                        resolve(true)
                    })
                })
            })
        })
    }

    static devolver(idcatalogo) {

    }
}

module.exports = Catalogo;
