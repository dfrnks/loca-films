const { db } = require('../database');

class Catalogo{
    static getAll() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM catalogo WHERE locado = 0 GROUP BY idimdb'
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
            let sql = 'SELECT * FROM catalogo WHERE titulo LIKE ? GROUP BY idimdb'
            db().all(sql, ['%' + titulo + '%'], (err, rows) => {
                if (err) {
                    reject(err)
                    return;
                }

                resolve(rows)
            })
        })
    }

    static locar(idcatalogo) {

    }

    static devolver(idcatalogo) {

    }
}

module.exports = Catalogo;
