const { connect } = require("../db");

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

        } catch (error) {
            console.log("Erro ao listar os métodos de pagamentos:", error);
        }
    }

    async atualizar() {
        try {            
            const { db, client } = await connect();
            const result = await db.collection("metodoPagamentos").updateOne(this.isAtivo = null,{
                tipo: this.tipo,
                dados: this.dados,
                status: this.status,
                isAtivo: this.isAtivo 
            });

            console.log("Método de Pagamento atualizado:", result.insertedId);
            client.close();

        } catch (error) {
            console.log("Erro ao atualizar Método de Pagamento:", error);
        }
    }
};

module.exports = MetodoPagamento;