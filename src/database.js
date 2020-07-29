const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');

const DBSOURCE = "db.sqlite"
//const DBSOURCE = ":memory:"

const db = () => {
    let db ;

    if (!db) {
        db = new sqlite3.Database(DBSOURCE, (err) => {
            if (err) {
                console.error(err.message)
            } else {
                console.log('Connected to the SQLite database.')

                // Feito dessa forma apenas para ser mais agil e
                // para não precisa rodar scrip de criação de tabelas
                // e inserção de dados
                db.run(`create table catalogo
                (
                    idcatalogo varchar(50)  not null constraint catalogo_pk primary key,
                    idimdb     varchar(10),
                    titulo     varchar(255) not null,
                    diretor    varchar(50),
                    locado     boolean default false not null
                );
                `, (err) => {
                    if (err) {
                        // Table already created
                    }else{
                        var insert = 'INSERT INTO catalogo (idcatalogo, idimdb, titulo, diretor, locado) VALUES (?,?,?,?,?)'

                        db.run('create unique index catalogo_idcatalogo_uindex on catalogo (idcatalogo);')

                        db.run(insert, [uuidv4(), 'tt0111161', 'Um Sonho de Liberdade', 'Frank Darabont', false])
                        db.run(insert, [uuidv4(), 'tt0068646', 'O Poderoso Chefão', 'Francis Ford Coppola', false])
                        db.run(insert, [uuidv4(), 'tt0468569', 'Batman: O Cavaleiro das Trevas', 'Christopher Nolan', false])
                        db.run(insert, [uuidv4(), 'tt0050083', '12 Homens e uma Sentença', 'Sidney Lumet', false])
                        db.run(insert, [uuidv4(), 'tt0120737', 'O Senhor dos Anéis: A Sociedade do Anel', 'Peter Jackson', false])
                        db.run(insert, [uuidv4(), 'tt0120737', 'O Senhor dos Anéis: A Sociedade do Anel', 'Peter Jackson', false])
                        db.run(insert, [uuidv4(), 'tt0468569', 'Batman: O Cavaleiro das Trevas', 'Christopher Nolan', false])
                        db.run(insert, [uuidv4(), 'tt0468569', 'Batman: O Cavaleiro das Trevas', 'Christopher Nolan', false])
                        db.run(insert, [uuidv4(), 'tt0468569', 'Batman: O Cavaleiro das Trevas', 'Christopher Nolan', false])
                        db.run(insert, [uuidv4(), 'tt0068646', 'O Poderoso Chefão', 'Francis Ford Coppola', false])
                        db.run(insert, [uuidv4(), 'tt0111161', 'Um Sonho de Liberdade', 'Frank Darabont', false])
                        db.run(insert, [uuidv4(), 'tt0050083', '12 Homens e uma Sentença', 'Sidney Lumet', false])
                        db.run(insert, [uuidv4(), 'tt0120737', 'O Senhor dos Anéis: A Sociedade do Anel', 'Peter Jackson', false])
                    }
                });

                db.run(`create table cliente
                (
                    idcliente varchar(50)  not null constraint cliente_pk primary key,
                    nome      varchar(50)  not null,
                    email     varchar(255) not null,
                    senha     varchar(255) not null
                );
                `, (err) => {
                    if (err) {
                        // Table already created
                        //console.log(err)
                    } else {
                        db.run('create unique index cliente_email_uindex on cliente (email);')
                        db.run('create unique index cliente_idcliente_uindex on cliente (idcliente);')
                    }
                });

                db.run(`create table locacao
                (
                    idlocacao      varchar(50) not null constraint locacao_pk primary key,
                    idcliente      varchar(50) references cliente,
                    idcatalogo     varchar(50) references catalogo,
                    dthr_locacao   timestamp   not null,
                    dthr_devolucao timestamp
                );
                `, (err) => {
                    if (err) {
                        // Table already created
                        //console.log(err)
                    } else {
                        db.run('create unique index locacao_idlocacao_uindex on locacao (idlocacao);')
                    }
                });
            }
        })
    }

    return db
}
module.exports = { db }
