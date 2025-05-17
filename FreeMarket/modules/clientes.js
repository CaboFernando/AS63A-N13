const { connect } = require("../db");
const { ObjectId } = require('mongodb');


class Cliente {
    constructor(nome, email, telefone, documento, idPedido, idEndereco, isAtivo) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.documento = documento;
        this.idPedido = idPedido;
        this.idEndereco = idEndereco;
        this.isAtivo = isAtivo;
    }

    async inserir() {
        try {
            const { db, client } = await connect();
            const result = await db.collection("clientes").insertOne({
                nome: this.nome,
                email: this.email,
                telefone: this.telefone,
                documento: this.documento,
                idPedido: this.idPedido,
                idEndereco: this.idEndereco,
                isAtivo: this.isAtivo
            });

            console.log("Cliente inserido:", result.insertedId);
            client.close();

        } catch (error) {
            console.log("Erro ao inserir cliente:", error);
        }
    }

    async listar() {
        try {
            const { db, client } = await connect();
            const result = await db.collection("clientes").find().toArray();

            console.log("Clientes listados:", result);
            client.close();
            return result;

        } catch (error) {
            console.log("Erro ao listar os cliente:", error);
        }
    }

    async obterPorId(id) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("clientes").findOne({ _id: new ObjectId(id) });

            if (result) {
                console.log("Cliente encontrado:", result);
            } else {
                console.log("Cliente não encontrado.");
            }

            client.close();

        } catch (error) {
            console.log("Erro ao obter cliente por ID:", error);
        }
    }

    async removerPorId(id) {
        try {
            const { db, client } = await connect();
            const resultado = await db.collection("clientes").deleteOne({ _id: new ObjectId(id) });

            if (resultado.deletedCount > 0) {
                console.log("Cliente removido com sucesso.");
            } else {
                console.log("Cliente não encontrado para remoção.");
            }

            client.close();
        } catch (error) {
            console.log("Erro ao remover cliente por ID:", error);
        }
    }
    
    async atualizar() {
        try {
            const { db, client } = await connect();
            const result = await db.collection("clientes").updateOne(this.isAtivo = null, {
                nome: this.nome,
                email: this.email,
                telefone: this.telefone,
                documento: this.documento,
                idPedido: this.idPedido,
                idEndereco: this.idEndereco,
                isAtivo: this.isAtivo
            });

            console.log("Cliente atualizado:", result.insertedId);
            client.close();

        } catch (error) {
            console.log("Erro ao atualizado cliente:", error);
        }
    }
};

module.exports = Cliente;