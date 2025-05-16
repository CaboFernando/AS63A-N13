const { connect } = require("./db");

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
};

module.exports = MetodoPagamento;