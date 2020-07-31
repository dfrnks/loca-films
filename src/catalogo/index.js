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

                if (!rows.length) {
                    reject({message: 'Nenhum filme encontrado!'})
                    return;
                }

                resolve(rows)
            })
        })
    }

    static locar(idcliente, idimdb) {
        return new Promise((resolve, reject) => {
            // O ideal seria utilizar algo do tipo como https://www.npmjs.com/package/process-lock-node
            // para trancar e apenas um cliente locar por vez o filme
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

    static devolver(idcliente, idimdb) {
        return new Promise((resolve, reject) => {
            // Procura a locacao
            let sql = `
            SELECT idlocacao, l.idcatalogo 
            FROM locacao l
                INNER JOIN catalogo c on l.idcatalogo = c.idcatalogo
            WHERE idcliente = ? AND idimdb = ? AND dthr_devolucao IS NULL 
            `

            db().get(sql, [ idcliente, idimdb ], (err, row) => {
                if (err) {
                    reject(err)
                    return;
                }

                if (!row) {
                    reject({message: 'Filme já devolvido!'})
                    return;
                }

                // Seta a data de devolução
                let update = 'UPDATE locacao SET dthr_devolucao = ? WHERE idlocacao = ?'

                db().run(update, [ Date.now(), row.idlocacao ], function (err) {
                    if (err) {
                        reject(err)
                        return;
                    }

                    // Libera ele no catalago
                    let update2 = 'UPDATE catalogo SET locado = 0 WHERE idcatalogo = ?'

                    db().run(update2, [ row.idcatalogo ], function (err) {
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

    static locados(idcliente) {
        return new Promise((resolve, reject) => {
            // Procura as locacaos
            let sql = `
            SELECT idimdb, titulo, diretor, dthr_locacao
            FROM locacao l
                INNER JOIN catalogo c on l.idcatalogo = c.idcatalogo
            WHERE idcliente = ? AND dthr_devolucao IS NULL 
            `

            db().all(sql, [ idcliente ], (err, rows) => {
                if (err) {
                    reject(err)
                    return;
                }

                if (!rows.length) {
                    reject({message: 'Nenhum filme locado!'})
                    return;
                }

                resolve(rows)
            })
        })
    }
}

module.exports = Catalogo;
