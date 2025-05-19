const { connect } = require("../config/db");
const { ObjectId } = require('mongodb');


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
            const result = await db.collection("metodoPagamentos").insertOne({
                tipo: this.tipo,
                dados: this.dados,
                status: this.status,
                isAtivo: this.isAtivo
            });

            console.log("Método de Pagamento inserido:", result.insertedId);
            client.close();

        } catch (error) {
            console.log("Erro ao inserir Método de Pagamento:", error);
        }
    }

    async listar() {
        try {
            const { db, client } = await connect();
            const result = await db.collection("metodoPagamentos").find().toArray();

            console.log("Métodos de Pagamentos listados:", result);
            client.close();
            return result;

        } catch (error) {
            console.log("Erro ao listar os métodos de pagamentos:", error);
        }
    }

    async obterPorId(id) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("metodoPagamentos").findOne({ _id: new ObjectId(id) });

            if (result) {
                console.log("Método de Pagamento encontrado:", result);
            } else {
                console.log("Método de Pagamento não encontrado.");
            }

            client.close();

        } catch (error) {
            console.log("Erro ao obter método de pagamento por ID:", error);
        }
    }

    async removerPorId(id) {
        try {
            const { db, client } = await connect();
            const resultado = await db.collection("metodoPagamentos").deleteOne({ _id: new ObjectId(id) });

            if (resultado.deletedCount > 0) {
                console.log("Método de Pagamento removido com sucesso.");
            } else {
                console.log("Cliente não método de pagamento para remoção.");
            }

            client.close();
        } catch (error) {
            console.log("Erro ao remover método de pagamento por ID:", error);
        }
    }

    async atualizar() {
        try {
            const { db, client } = await connect();
            const resultado = await db.collection("metodoPagamentos").updateOne(
                { _id: new ObjectId(this._id) },
                {
                    $set: {
                        tipo: this.tipo,
                        detalhes: this.detalhes
                    }
                }
            );

            if (resultado.modifiedCount > 0) {
                console.log("Método de pagamento atualizado com sucesso.");
            } else {
                console.log("Método de pagamento não encontrado para atualização.");
            }

            client.close();
        } catch (error) {
            console.log("Erro ao atualizar método de pagamento:", error);
        }
    }

};

module.exports = MetodoPagamento;