const { connect } = require("../config/db");
const { ObjectId } = require('mongodb');
const Logger = require("../utils/Logger");

class Endereco {
    constructor(rua, numero, cep, logradouro, isAtivo) {
        this.rua = rua;
        this.numero = numero;
        this.cep = cep;
        this.logradouro = logradouro;
        this.isAtivo = isAtivo;
    }

    async inserir() {
        try {
            const { db, client } = await connect();
            const resultado = await db.collection("enderecos").insertOne({
                rua: this.rua,
                numero: this.numero,
                cep: this.cep,
                logradouro: this.logradouro,
                isAtivo: this.isAtivo
            });

            console.log("Endereço inserido:", resultado.insertedId);
            return resultado.insertedId;

        } catch (error) {
            Logger.log("Erro ao inserir endereço! " + error);
        } finally {
            console.log("Fechando conexão com o banco de dados.");
        }
    }

    async listar() {
        try {
            const { db, client } = await connect();
            const enderecos = await db.collection("enderecos").find().toArray();

            console.log("Endereços listados:", enderecos);
            return enderecos;

        } catch (error) {
            Logger.log("Erro ao listar endereços! " + error);
        } finally {
            console.log("Fechando conexão com o banco de dados.");
        }
    }

    async obterPorId(id) {
        try {
            const { db, client } = await connect();
            const endereco = await db.collection("enderecos").findOne({ _id: new ObjectId(id) });

            endereco ? console.log("Endereço encontrado:", endereco) : console.log("Endereço não encontrado.");

        } catch (error) {
            Logger.log("Erro ao obter endereço por ID! " + error);
        } finally {
            console.log("Fechando conexão com o banco de dados.");
        }
    }

    async removerPorId(id) {
        try {
            const { db, client } = await connect();
            const resultado = await db.collection("enderecos").deleteOne({ _id: new ObjectId(id) });

            console.log(resultado.deletedCount > 0 ? "Endereço removido com sucesso." : "Endereço não encontrado para remoção.");

        } catch (error) {
            Logger.log("Erro ao remover endereço por ID! " + error);
        } finally {
            console.log("Fechando conexão com o banco de dados.");
        }
    }

    async atualizar(filtro, novosDados) {
        try {
            const { db, client } = await connect();
            const resultado = await db.collection("enderecos").updateOne(filtro, { $set: novosDados });

            console.log(resultado.modifiedCount > 0 ? "Endereço atualizado com sucesso!" : "Endereço não encontrado para atualização.");

        } catch (error) {
            Logger.log("Erro ao atualizar endereço! " + error);
        } finally {
            console.log("Fechando conexão com o banco de dados.");
        }
    }
}

module.exports = Endereco;
