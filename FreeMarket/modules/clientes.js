const { connect } = require("../db");

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
        try {            
            const { db, client } = await connect();
            const result = await db.collection("clientes").insertOne({
                nome: this.nome,
                email: this.email,
                telefone: this.telefone,
                documento: this.documento, 
                idPedido: this.idPedido,
                idEndereco: this.idEndereco,
                isAtivo: this.isAtivo 
            });

            console.log("Cliente inserido:", result.insertedId);
            client.close();

        } catch (error) {
            console.log("Erro ao inserir cliente:", error);
        }
    }

    async listar() {
        try {            
            const { db, client } = await connect();
            const result = await db.collection("clientes").find().toArray();

            console.log("Clientes listados:", result);
            client.close();

        } catch (error) {
            console.log("Erro ao listar os cliente:", error);
        }
    }

    async atualizar() {
        try {            
            const { db, client } = await connect();
            const result = await db.collection("clientes").updateOne(this.isAtivo = null,{
                nome: this.nome,
                email: this.email,
                telefone: this.telefone,
                documento: this.documento, 
                idPedido: this.idPedido,
                idEndereco: this.idEndereco,
                isAtivo: this.isAtivo 
            });

            console.log("Cliente atualizado:", result.insertedId);
            client.close();

        } catch (error) {
            console.log("Erro ao atualizado cliente:", error);
        }
    }
};

module.exports = Cliente;