const { connect } = require("../db");

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

    async listar() {
        try {            
            const { db, client } = await connect();
            const result = await db.collection("enderecos").find().toArray();

            console.log("Endereços listados:", result);
            client.close();

        } catch (error) {
            console.log("Erro ao listar os endereços:", error);
        }
    }

    async atualizar() {
        try {            
            const { db, client } = await connect();
            const result = await db.collection("enderecos").updateOne(this.isAtivo = null,{
                rua: this.rua,
                numero: this.numero,
                cep: this.cep,
                logradouro: this.logradouro, 
                isAtivo: this.isAtivo 
            });

            console.log("Endereço atualizado:", result.insertedId);
            client.close();

        } catch (error) {
            console.log("Erro ao atualizar endereço:", error);
        }
    }
};

module.exports = Endereco;