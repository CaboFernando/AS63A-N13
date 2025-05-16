const { connect } = require("./db");

class Endereco {
    constructor(rua, numero, cep, logradouro, isAtivo) {
        this.rua = rua;
        this.numero = numero;
        this.cep = cep;
        this.logradouro = logradouro;
        this.isAtivo = isAtivo;
    }

    async inserir() {
        try {            
            const { db, client } = await connect();
            const result = await db.collection("enderecos").insertOne({
                rua: this.rua,
                numero: this.numero,
                cep: this.cep,
                logradouro: this.logradouro, 
                isAtivo: this.isAtivo 
            });

            console.log("Endereço inserido:", result.insertedId);
            client.close();

        } catch (error) {
            console.log("Erro ao inserir endereço:", error);
        }
    }
};

module.exports = Endereco;