const { connect } = require("../config/db");
const { ObjectId } = require('mongodb');
const Logger = require("../utils/Logger");

class MetodoPagamento {
    constructor(tipo, dados, status, isAtivo) {
        this.tipo = tipo;
        this.dados = dados;
        this.status = status;
        this.isAtivo = isAtivo;
    }

    async inserir() {
        let client;
        try {
            if (!this.tipo || !this.dados || !this.status) {
                throw new Error("Tipo, dados e status são obrigatórios.");
            }

            const { db, client: connectedClient } = await connect();
            client = connectedClient;

            const tiposPermitidos = ["Crédito", "Débito", "PIX"];
            if (!tiposPermitidos.includes(this.tipo)) {
                throw new Error("Tipo de pagamento inválido.");
            }

            const resultado = await db.collection("metodoPagamentos").insertOne({
                tipo: this.tipo,
                dados: this.dados,
                status: this.status,
                isAtivo: this.isAtivo
            });

            console.log("Método de Pagamento inserido:", resultado.insertedId);
            return resultado.insertedId;

        } catch (error) {
            Logger.log("Erro ao inserir método de pagamento! " + error);
        } finally {
            if (client) await client.close();
        }
    }

    async listar() {
        let client;
        try {
            const { db, client: connectedClient } = await connect();
            client = connectedClient;

            const metodos = await db.collection("metodoPagamentos").find().toArray();

            console.log("Métodos de Pagamentos listados:", metodos);
            return metodos;

        } catch (error) {
            Logger.log("Erro ao listar métodos de pagamento! " + error);
        } finally {
            if (client) await client.close();
        }
    }

    async obterPorId(id) {
        let client;
        try {
            const { db, client: connectedClient } = await connect();
            client = connectedClient;

            const metodo = await db.collection("metodoPagamentos").findOne({ _id: new ObjectId(id) });

            metodo ? console.log("Método de Pagamento encontrado:", metodo) : console.log("Método de Pagamento não encontrado.");

        } catch (error) {
            Logger.log("Erro ao obter método de pagamento por ID! " + error);
        } finally {
            if (client) await client.close();
        }
    }

    async removerPorId(id) {
        let client;
        try {
            const { db, client: connectedClient } = await connect();
            client = connectedClient;

            const resultado = await db.collection("metodoPagamentos").deleteOne({ _id: new ObjectId(id) });

            console.log(resultado.deletedCount > 0 ? "Método de pagamento removido com sucesso." : "Método de pagamento não encontrado para remoção.");

        } catch (error) {
            Logger.log("Erro ao remover método de pagamento por ID! " + error);
        } finally {
            if (client) await client.close();
        }
    }

    async atualizar(filtro, novosDados) {
        let client;
        try {
            if (!novosDados.tipo || !novosDados.dados || !novosDados.status) {
                throw new Error("Tipo, dados e status são obrigatórios.");
            }

            const { db, client: connectedClient } = await connect();
            client = connectedClient;

            const tiposPermitidos = ["Crédito", "Débito", "PIX"];
            if (!tiposPermitidos.includes(novosDados.tipo)) {
                throw new Error("Tipo de pagamento inválido.");
            }

            const resultado = await db.collection("metodoPagamentos").updateOne(filtro, { $set: novosDados });

            console.log(resultado.modifiedCount > 0 ? "Método de pagamento atualizado com sucesso!" : "Método de pagamento não encontrado para atualização.");

        } catch (error) {
            Logger.log("Erro ao atualizar método de pagamento! " + error);
        } finally {
            if (client) await client.close();
        }
    }
}

module.exports = MetodoPagamento;
