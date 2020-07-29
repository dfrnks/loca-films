const sqlite3 = require('sqlite3').verbose();
const db = () => {
    let db ;

    if (!db) {
        //new sqlite3.Database(':memory:');
        db = new sqlite3.Database('database.db', (err) => {
            if (err) {
                console.error(err.message)
            }
            console.log('Connected to the chinook database.')
        })
    }

    return db
}
module.exports = { db }
