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
            client.close();

        } catch (error) {
            Logger.log("Erro ao inserir pedido! " + error);
        }
    }

    async listar() {
        try {
            const { db, client } = await connect();
            const pedidos = await db.collection("pedidos").find().toArray();

            console.log("Pedidos listados:", pedidos);
            client.close();

            return pedidos;

        } catch (error) {
            Logger.log("Erro ao listar pedidos! " + error);
        }
    }

    async obterPorId(id) {
        try {
            const { db, client } = await connect();
            const pedido = await db.collection("pedidos").findOne({ _id: new ObjectId(id) });

            pedido ? console.log("Pedido encontrado:", pedido) : console.log("Pedido não encontrado.");
            client.close();

        } catch (error) {
            Logger.log("Erro ao obter pedido por ID! " + error);
        }
    }

    async removerPorId(id) {
        try {
            const { db, client } = await connect();
            const resultado = await db.collection("pedidos").deleteOne({ _id: new ObjectId(id) });

            console.log(resultado.deletedCount > 0 ? "Pedido removido com sucesso." : "Pedido não encontrado para remoção.");
            client.close();

        } catch (error) {
            Logger.log("Erro ao remover pedido por ID! " + error);
        }
    }

    async atualizar(filtro, novosDados) {
        try {
            const { db, client } = await connect();
            const resultado = await db.collection("pedidos").updateOne(filtro, { $set: novosDados });

            console.log(resultado.modifiedCount > 0 ? "Pedido atualizado com sucesso!" : "Pedido não encontrado para atualização.");
            client.close();

        } catch (error) {
            Logger.log("Erro ao atualizar pedido! " + error);
        }
    }
}

module.exports = Pedido;
