const { connect } = require("../db");

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

    async listar() {
        try {            
            const { db, client } = await connect();
            const result = await db.collection("produtos").find().toArray();

            console.log("Produtos listados:", result);
            client.close();

        } catch (error) {
            console.log("Erro ao listar os produtos:", error);
        }
    }

    async atualizar() {
        try {            
            const { db, client } = await connect();
            const result = await db.collection("produtos").updateOne(this.isAtivo = null,{
                nome: this.nome,
                descricao: this.descricao,
                condicao: this.condicao,
                isAtivo: this.isAtivo 
            });

            console.log("Produto atualizado:", result.insertedId);
            client.close();

        } catch (error) {
            console.log("Erro ao atualizar produto:", error);
        }
    }
};

module.exports = Produto;