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
        let client;
        try {
            if (!this.nome || !this.descricao || !this.condicao) {
                throw new Error("Nome, descrição e condição são obrigatórios.");
            }

            const { db, client: connectedClient } = await connect();
            client = connectedClient;

            const condicoesPermitidas = ["novo", "usado", "recondicionado"];
            if (!condicoesPermitidas.includes(this.condicao)) {
                throw new Error("Condição inválida.");
            }

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
            if (client) await client.close();
        }
    }

    async listar() {
        let client;
        try {
            const { db, client: connectedClient } = await connect();
            client = connectedClient;

            const produtos = await db.collection("produtos").find().toArray();

            console.log("Produtos listados:", produtos);
            return produtos;

        } catch (error) {
            Logger.log("Erro ao listar produtos! " + error);
        } finally {
            if (client) await client.close();
        }
    }

    async obterPorId(id) {
        let client;
        try {
            const { db, client: connectedClient } = await connect();
            client = connectedClient;

            const produto = await db.collection("produtos").findOne({ _id: new ObjectId(id) });

            produto ? console.log("Produto encontrado:", produto) : console.log("Produto não encontrado.");

        } catch (error) {
            Logger.log("Erro ao obter produto por ID! " + error);
        } finally {
            if (client) await client.close();
        }
    }

    async removerPorId(id) {
        let client;
        try {
            const { db, client: connectedClient } = await connect();
            client = connectedClient;

            const resultado = await db.collection("produtos").deleteOne({ _id: new ObjectId(id) });

            console.log(resultado.deletedCount > 0 ? "Produto removido com sucesso." : "Produto não encontrado para remoção.");

        } catch (error) {
            Logger.log("Erro ao remover produto por ID! " + error);
        } finally {
            if (client) await client.close();
        }
    }

    async atualizar(filtro, novosDados) {
        let client;
        try {
            if (!novosDados.nome || !novosDados.descricao || !novosDados.condicao) {
                throw new Error("Nome, descrição e condição são obrigatórios.");
            }

            const { db, client: connectedClient } = await connect();
            client = connectedClient;

            const condicoesPermitidas = ["novo", "usado", "recondicionado"];
            if (!condicoesPermitidas.includes(novosDados.condicao)) {
                throw new Error("Condição inválida.");
            }

            const resultado = await db.collection("produtos").updateOne(filtro, { $set: novosDados });

            console.log(resultado.modifiedCount > 0 ? "Produto atualizado com sucesso!" : "Produto não encontrado para atualização.");

        } catch (error) {
            Logger.log("Erro ao atualizar produto! " + error);
        } finally {
            if (client) await client.close();
        }
    }
}

module.exports = Produto;
