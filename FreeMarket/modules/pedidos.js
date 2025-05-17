const { connect } = require("../db");
const { ObjectId } = require('mongodb');


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
            const result = await db.collection("pedidos").insertOne({
                dataCompra: this.dataCompra,
                dataEntrega: this.dataEntrega,
                idProduto: this.idProduto,
                idMetodoPagamento: this.idMetodoPagamento, 
                status: this.status,
                isAtivo: this.isAtivo 
            });

            console.log("Pedido inserido:", result.insertedId);
            client.close();

        } catch (error) {
            console.log("Erro ao inserir pedido:", error);
        }
    }

    async listar() {
        try {            
            const { db, client } = await connect();
            const result = await db.collection("pedidos").find().toArray();

            console.log("Pedidos listados:", result);
            client.close();
            return result;

        } catch (error) {
            console.log("Erro ao listar os pedidos:", error);
        }
    }

    async obterPorId(id) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("pedidos").findOne({ _id: new ObjectId(id) });

            if (result) {
                console.log("Pedido encontrado:", result);
            } else {
                console.log("Pedido não encontrado.");
            }

            client.close();

        } catch (error) {
            console.log("Erro ao obter pedido por ID:", error);
        }
    }

    async removerPorId(id) {
        try {
            const { db, client } = await connect();
            const resultado = await db.collection("pedidos").deleteOne({ _id: new ObjectId(id) });

            if (resultado.deletedCount > 0) {
                console.log("Pedido removido com sucesso.");
            } else {
                console.log("Pedido não encontrado para remoção.");
            }

            client.close();
        } catch (error) {
            console.log("Erro ao remover pedido por ID:", error);
        }
    }

    async atualizar() {
        try {            
            const { db, client } = await connect();
            const result = await db.collection("pedidos").updateOne(this.isAtivo = null,{
                dataCompra: this.dataCompra,
                dataEntrega: this.dataEntrega,
                idProduto: this.idProduto,
                idMetodoPagamento: this.idMetodoPagamento, 
                status: this.status,
                isAtivo: this.isAtivo 
            });

            console.log("Pedido atualizado:", result.insertedId);
            client.close();

        } catch (error) {
            console.log("Erro ao atualizar pedido:", error);
        }
    }
};

module.exports = Pedido;