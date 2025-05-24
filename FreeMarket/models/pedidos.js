const { connect } = require("../config/db");
const { ObjectId } = require('mongodb');
const Logger = require("../utils/Logger");

class Pedido {
    constructor(dataCompra, dataEntrega, idProduto, idMetodoPagamento, status, isAtivo) {
        this.dataCompra = dataCompra;
        this.dataEntrega = dataEntrega;
        this.idProduto = idProduto;
        this.idMetodoPagamento = idMetodoPagamento;
        this.status = status;
        this.isAtivo = isAtivo;
    }

    async inserir() {
        try {
            const { db, client } = await connect();
            const resultado = await db.collection("pedidos").insertOne({
                dataCompra: this.dataCompra,
                dataEntrega: this.dataEntrega,
                idProduto: this.idProduto,
                idMetodoPagamento: this.idMetodoPagamento,
                status: this.status,
                isAtivo: this.isAtivo
            });

            console.log("Pedido inserido:", resultado.insertedId);
            return resultado.insertedId;

        } catch (error) {
            Logger.log("Erro ao inserir pedido! " + error);
        } finally {
            console.log("Fechando conexão com o banco de dados.");
        }
    }

    async listar() {
        try {
            const { db, client } = await connect();
            const pedidos = await db.collection("pedidos").find().toArray();

            console.log("Pedidos listados:", pedidos);
            return pedidos;

        } catch (error) {
            Logger.log("Erro ao listar pedidos! " + error);
        } finally {
            console.log("Fechando conexão com o banco de dados.");
        }
    }

    async obterPorId(id) {
        try {
            const { db, client } = await connect();
            const pedido = await db.collection("pedidos").findOne({ _id: new ObjectId(id) });

            pedido ? console.log("Pedido encontrado:", pedido) : console.log("Pedido não encontrado.");

        } catch (error) {
            Logger.log("Erro ao obter pedido por ID! " + error);
        } finally {
            console.log("Fechando conexão com o banco de dados.");
        }
    }

    async removerPorId(id) {
        try {
            const { db, client } = await connect();
            const resultado = await db.collection("pedidos").deleteOne({ _id: new ObjectId(id) });

            console.log(resultado.deletedCount > 0 ? "Pedido removido com sucesso." : "Pedido não encontrado para remoção.");

        } catch (error) {
            Logger.log("Erro ao remover pedido por ID! " + error);
        } finally {
            console.log("Fechando conexão com o banco de dados.");
        }
    }

    async atualizar(filtro, novosDados) {
        try {
            const { db, client } = await connect();
            const resultado = await db.collection("pedidos").updateOne(filtro, { $set: novosDados });

            console.log(resultado.modifiedCount > 0 ? "Pedido atualizado com sucesso!" : "Pedido não encontrado para atualização.");

        } catch (error) {
            Logger.log("Erro ao atualizar pedido! " + error);
        } finally {
            console.log("Fechando conexão com o banco de dados.");
        }
    }
}

module.exports = Pedido;
