const bcrypt = require('bcrypt');
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
        // Salva no banco aqui mesmo

        return true;
    }

    static login(email, senha) {
        bcrypt.compareSync(senha, hash); // true
    }

    static logout() {

    }
}

module.exports = Cliente;
