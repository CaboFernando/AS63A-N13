const { connect } = require("../config/db");
const { ObjectId } = require('mongodb');
const Logger = require("../utils/Logger");

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
            const resultado = await db.collection("produtos").insertOne({
                nome: this.nome,
                descricao: this.descricao,
                condicao: this.condicao,
                isAtivo: this.isAtivo
            });

            console.log("Produto inserido:", resultado.insertedId);
            return resultado.insertedId;

        } catch (error) {
            Logger.log("Erro ao inserir produto! " + error);
        } finally {
            console.log("Fechando conexão com o banco de dados.");
        }
    }

    async listar() {
        try {
            const { db, client } = await connect();
            const produtos = await db.collection("produtos").find().toArray();

            console.log("Produtos listados:", produtos);
            return produtos;

        } catch (error) {
            Logger.log("Erro ao listar produtos! " + error);
        } finally {
            console.log("Fechando conexão com o banco de dados.");
        }
    }

    async obterPorId(id) {
        try {
            const { db, client } = await connect();
            const produto = await db.collection("produtos").findOne({ _id: new ObjectId(id) });

            produto ? console.log("Produto encontrado:", produto) : console.log("Produto não encontrado.");

        } catch (error) {
            Logger.log("Erro ao obter produto por ID! " + error);
        } finally {
            console.log("Fechando conexão com o banco de dados.");
        }
    }

    async removerPorId(id) {
        try {
            const { db, client } = await connect();
            const resultado = await db.collection("produtos").deleteOne({ _id: new ObjectId(id) });

            console.log(resultado.deletedCount > 0 ? "Produto removido com sucesso." : "Produto não encontrado para remoção.");

        } catch (error) {
            Logger.log("Erro ao remover produto por ID! " + error);
        } finally {
            console.log("Fechando conexão com o banco de dados.");
        }
    }

    async atualizar(filtro, novosDados) {
        try {
            const { db, client } = await connect();
            const resultado = await db.collection("produtos").updateOne(filtro, { $set: novosDados });

            console.log(resultado.modifiedCount > 0 ? "Produto atualizado com sucesso!" : "Produto não encontrado para atualização.");

        } catch (error) {
            Logger.log("Erro ao atualizar produto! " + error);
        } finally {
            console.log("Fechando conexão com o banco de dados.");
        }
    }
}

module.exports = Produto;
