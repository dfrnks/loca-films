const Client = require("./index")

describe('Cliando um novo cliente', () => {
    let client
    beforeEach(() => {
        client = new Client("Eva zu Beck", "eva@mail.com", "8fFCYgpMvVJ1aMnH")
    });

    it('Verificando informações do cliente', () => {
        expect(client.nome).toEqual("Eva zu Beck")
        expect(client.email).toEqual("eva@mail.com")
        expect(client.senha).toEqual("8fFCYgpMvVJ1aMnH")
        expect(client.hash).not.toEqual("8fFCYgpMvVJ1aMnH")

        console.log(client.hash)
    })
})
