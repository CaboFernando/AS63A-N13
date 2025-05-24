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
        try {
            const { db, client } = await connect();
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
            console.log("Fechando conexão com o banco de dados.");
        }
    }

    async listar() {
        try {
            const { db, client } = await connect();
            const metodos = await db.collection("metodoPagamentos").find().toArray();

            console.log("Métodos de Pagamentos listados:", metodos);
            return metodos;

        } catch (error) {
            Logger.log("Erro ao listar métodos de pagamento! " + error);
        } finally {
            console.log("Fechando conexão com o banco de dados.");
        }
    }

    async obterPorId(id) {
        try {
            const { db, client } = await connect();
            const metodo = await db.collection("metodoPagamentos").findOne({ _id: new ObjectId(id) });

            metodo ? console.log("Método de Pagamento encontrado:", metodo) : console.log("Método de Pagamento não encontrado.");

        } catch (error) {
            Logger.log("Erro ao obter método de pagamento por ID! " + error);
        } finally {
            console.log("Fechando conexão com o banco de dados.");
        }
    }

    async removerPorId(id) {
        try {
            const { db, client } = await connect();
            const resultado = await db.collection("metodoPagamentos").deleteOne({ _id: new ObjectId(id) });

            console.log(resultado.deletedCount > 0 ? "Método de pagamento removido com sucesso." : "Método de pagamento não encontrado para remoção.");

        } catch (error) {
            Logger.log("Erro ao remover método de pagamento por ID! " + error);
        } finally {
            console.log("Fechando conexão com o banco de dados.");
        }
    }

    async atualizar(filtro, novosDados) {
        try {
            const { db, client } = await connect();
            const resultado = await db.collection("metodoPagamentos").updateOne(filtro, { $set: novosDados });

            console.log(resultado.modifiedCount > 0 ? "Método de pagamento atualizado com sucesso!" : "Método de pagamento não encontrado para atualização.");

        } catch (error) {
            Logger.log("Erro ao atualizar método de pagamento! " + error);
        } finally {
            console.log("Fechando conexão com o banco de dados.");
        }
    }
}

module.exports = MetodoPagamento;
