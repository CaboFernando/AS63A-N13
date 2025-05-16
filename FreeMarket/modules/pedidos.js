const { connect } = require("./db");

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
};

module.exports = Pedido;