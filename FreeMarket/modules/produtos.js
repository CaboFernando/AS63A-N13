const { connect } = require("./db");

class Produto {
    constructor(nome, descricao, condicao, isAtivo) {
        this.nome = nome;
        this.descricao = descricao;
        this.condicao = condicao;
        this.isAtivo = isAtivo;
    }

    async inserir() {
        try {            
            const { db, client } = await connect();
            const result = await db.collection("produtos").insertOne({
                nome: this.nome,
                descricao: this.descricao,
                condicao: this.condicao,
                isAtivo: this.isAtivo 
            });

            console.log("Produto inserido:", result.insertedId);
            client.close();

        } catch (error) {
            console.log("Erro ao inserir produto:", error);
        }
    }
};

module.exports = Produto;