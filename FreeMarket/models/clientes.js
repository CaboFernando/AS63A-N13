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
            return resultado.insertedId;

        } catch (error) {
            Logger.log("Erro ao inserir cliente!" + error);
        } finally {
            console.log("Fechando conexão com o banco de dados.");
        }
    }

    async listar() {
        let client;
        try {
            const { db, client: connectedClient } = await connect();
            client = connectedClient;

            const clientes = await db.collection("clientes").find().toArray();

            const clientesCompletos = await Promise.all(
                clientes.map(async (cliente) => {
                    const pedido = cliente.idPedido
                        ? await db.collection("pedidos").findOne({ _id: new ObjectId(cliente.idPedido) })
                        : null;
                    const endereco = cliente.idEndereco
                        ? await db.collection("enderecos").findOne({ _id: new ObjectId(cliente.idEndereco) })
                        : null;

                    const {idPedido, idEndereco, ...clienteRest} = cliente;
                    return {
                        ...clienteRest,
                        pedido,
                        endereco,
                        isAtivo: cliente.isAtivo
                    };
                })
            );

            console.log("Clientes listados:", clientesCompletos);
            return clientesCompletos;

        } catch (error) {
            Logger.log("Erro ao listar os clientes!" + error);
        } finally {
            console.log("Fechando conexão com o banco de dados.");
        }
    }

    async obterPorId(id) {
        let client;
        try {
            const { db, client: connectedClient } = await connect();
            client = connectedClient;

            const cliente = await db.collection("clientes").findOne({ _id: new ObjectId(id) });
            if (!cliente) {
                console.log("Cliente não encontrado.");
                return null;
            }

            const pedido = cliente.idPedido
                ? await db.collection("pedidos").findOne({ _id: new ObjectId(cliente.idPedido) })
                : null;
            const endereco = cliente.idEndereco
                ? await db.collection("enderecos").findOne({ _id: new ObjectId(cliente.idEndereco) })
                : null;

            const { idPedido, idEndereco, ...clienteRest } = cliente;
            const clienteCompleto = {
                ...clienteRest,
                pedido,
                endereco,
                isAtivo: cliente.isAtivo
            };

            console.log("Cliente encontrado:", clienteCompleto);
            return clienteCompleto;

        } catch (error) {
            Logger.log("Erro ao obter cliente po ID!" + error);
        } finally {
            console.log("Fechando conexão com o banco de dados.");
        }
    }

    async removerPorId(id) {
        try {
            const { db, client } = await connect();
            const resultado = await db.collection("clientes").deleteOne({ _id: new ObjectId(id) });

            console.log(resultado.deletedCount > 0 ? "Cliente removido com sucesso." : "Cliente não encontrado para remoção.");

        } catch (error) {
            Logger.log("Erro ao remover cliente por ID!" + error);
        } finally {
            console.log("Fechando conexão com o banco de dados.");
        }
    }

    async atualizarCliente(filtro, novosDados) {
        try {
            const { db, client } = await connect();

            const resultado = await db.collection("clientes").updateOne(filtro, {
                $set: novosDados,
            });

            console.log(resultado.modifiedCount > 0 ? "Cliente atualizado com sucesso." : "Cliente não encontrado para atualização.");

        } catch (error) {
            Logger.log("Erro ao atualizar cliente! " + error);
        } finally {
            console.log("Fechando conexão com o banco de dados.");
        }
    }

};

module.exports = Cliente;