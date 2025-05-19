const { connect } = require("../config/db");
const { ObjectId } = require('mongodb');


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
            return result;

        } catch (error) {
            console.log("Erro ao listar os produtos:", error);
        }
    }

    async obterPorId(id) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("produtos").findOne({ _id: new ObjectId(id) });

            if (result) {
                console.log("Produto encontrado:", result);
            } else {
                console.log("Produto não encontrado.");
            }

            client.close();

        } catch (error) {
            console.log("Erro ao obter produto por ID:", error);
        }
    }

    async removerPorId(id) {
        try {
            const { db, client } = await connect();
            const resultado = await db.collection("produtos").deleteOne({ _id: new ObjectId(id) });

            if (resultado.deletedCount > 0) {
                console.log("Produto removido com sucesso.");
            } else {
                console.log("Produto não encontrado para remoção.");
            }

            client.close();
        } catch (error) {
            console.log("Erro ao remover produto por ID:", error);
        }
    }

    async atualizar() {
        try {
            const { db, client } = await connect();
            const resultado = await db.collection("produtos").updateOne(
                { _id: new ObjectId(this._id) },
                {
                    $set: {
                        nome: this.nome,
                        descricao: this.descricao,
                        preco: this.preco
                    }
                }
            );

            if (resultado.modifiedCount > 0) {
                console.log("Produto atualizado com sucesso.");
            } else {
                console.log("Produto não encontrado para atualização.");
            }

            client.close();
        } catch (error) {
            console.log("Erro ao atualizar produto:", error);
        }
    }

};

module.exports = Produto;