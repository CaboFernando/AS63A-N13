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
        let client;
        try {
            if (!this.nome || !this.email || !this.documento) {
                throw new Error("Nome, email e documento são obrigatórios.");
            }

            const { db, client: connectedClient } = await connect();
            client = connectedClient;

            if (this.idPedido) {
                const pedidoExiste = await db.collection("pedidos").findOne({ _id: new ObjectId(this.idPedido) });
                if (!pedidoExiste) throw new Error("Pedido relacionado não encontrado.");
            }
            if (this.idEndereco) {
                const enderecoExiste = await db.collection("enderecos").findOne({ _id: new ObjectId(this.idEndereco) });
                if (!enderecoExiste) throw new Error("Endereço relacionado não encontrado.");
            }

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
            Logger.log("Erro ao inserir cliente: " + error);
        } finally {
            if (client) await client.close();
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

                    const { idPedido, idEndereco, ...clienteRest } = cliente;
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
            Logger.log("Erro ao listar clientes: " + error);
        } finally {
            if (client) await client.close();
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
            Logger.log("Erro ao obter cliente por ID: " + error);
        } finally {
            if (client) await client.close();
        }
    }

    async removerPorId(id) {
        let client;
        try {
            const { db, client: connectedClient } = await connect();
            client = connectedClient;

            const resultado = await db.collection("clientes").deleteOne({ _id: new ObjectId(id) });

            console.log(resultado.deletedCount > 0 ? "Cliente removido com sucesso." : "Cliente não encontrado para remoção.");

        } catch (error) {
            Logger.log("Erro ao remover cliente por ID: " + error);
        } finally {
            if (client) await client.close();
        }
    }

    async atualizarCliente(filtro, novosDados) {
        let client;
        try {
            if (!filtro || Object.keys(filtro).length === 0) {
                throw new Error("Filtro de atualização inválido.");
            }

            if (!novosDados.nome || !novosDados.email || !novosDados.documento) {
                throw new Error("Nome, email e documento são obrigatórios.");
            }

            const { db, client: connectedClient } = await connect();
            client = connectedClient;            

            if (novosDados.idPedido) {
                const pedidoExiste = await db.collection("pedidos").findOne({ _id: new ObjectId(novosDados.idPedido) });
                if (!pedidoExiste) throw new Error("Pedido relacionado não encontrado.");
            }
            if (novosDados.idEndereco) {
                const enderecoExiste = await db.collection("enderecos").findOne({ _id: new ObjectId(novosDados.idEndereco) });
                if (!enderecoExiste) throw new Error("Endereço relacionado não encontrado.");
            }

            const resultado = await db.collection("clientes").updateOne(filtro, {
                $set: novosDados,
            });

            console.log(resultado.modifiedCount > 0 ? "Cliente atualizado com sucesso." : "Cliente não encontrado para atualização.");

        } catch (error) {
            Logger.log("Erro ao atualizar cliente: " + error);
        } finally {
            if (client) await client.close();
        }
    }

};

module.exports = Cliente;