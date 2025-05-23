const { connect } = require("../config/db");
const { ObjectId } = require('mongodb');
const Logger = require("../utils/Logger");


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
            const resultado = await db.collection("clientes").insertOne({
                nome: this.nome,
                email: this.email,
                telefone: this.telefone,
                documento: this.documento,
                idPedido: this.idPedido,
                idEndereco: this.idEndereco,
                isAtivo: this.isAtivo
            });

            console.log("Cliente inserido:", resultado.insertedId);
            client.close();

        } catch (error) {
            Logger.log("Erro ao inserir cliente!" + error);
        }
    }

    async listar() {
        try {
            const { db, client } = await connect();
            const clientes = await db.collection("clientes").find().toArray();

            console.log("Clientes listados:", clientes);
            client.close();

            return clientes;

        } catch (error) {
            Logger.log("Erro ao listar os clientes!" + error);
        }
    }

    async obterPorId(id) {
        try {
            const { db, client } = await connect();
            const cliente = await db.collection("clientes").findOne({ _id: new ObjectId(id) });
            
            cliente ? console.log("Cliente encontrado:", cliente) : console.log("Cliente não encontrado.");
            client.close();

        } catch (error) {
            Logger.log("Erro ao obter cliente po ID!" + error);
        }
    }

    async removerPorId(id) {
        try {
            const { db, client } = await connect();
            const resultado = await db.collection("clientes").deleteOne({ _id: new ObjectId(id) });

            console.log(resultado.deletedCount > 0 ? "Cliente removido com sucesso." : "Cliente não encontrado para remoção.");
            client.close();

        } catch (error) {
            Logger.log("Erro ao remover cliente por ID!" + error);
        }
    }

    async atualizarCliente(filtro, novosDados) {
        try {
            const { db, client } = await connect();

            const resultado = await db.collection("clientes").updateOne(filtro, {
                $set: novosDados,
            });

            console.log(resultado.modifiedCount > 0 ? "Cliente atualizado com sucesso." : "Cliente não encontrado para atualização.");
            client.close();

        } catch (error) {
            Logger.log("Erro ao atualizar cliente! " + error);
        }
    }

};

module.exports = Cliente;