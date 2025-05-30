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
        let client;
        try {
            if (!this.rua || !this.cep || !this.logradouro) {
                throw new Error("Rua, CEP e logradouro são obrigatórios.");
            }

            const { db, client: connectedClient } = await connect();
            client = connectedClient;

            if (!/^\d{5}-\d{3}$/.test(this.cep)) {
                throw new Error("CEP inválido (formato esperado: 12345-678).");
            }

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
            Logger.log("Erro ao inserir endereço: " + error);
        } finally {
            if (client) await client.close();
        }
    }

    async listar() {
        let client;
        try {
            const { db, client: connectedClient } = await connect();
            client = connectedClient;

            const enderecos = await db.collection("enderecos").find().toArray();

            console.log("Endereços listados:", enderecos);
            return enderecos;

        } catch (error) {
            Logger.log("Erro ao listar endereços: " + error);
        } finally {
            if (client) await client.close();
        }
    }

    async obterPorId(id) {
        let client;
        try {
            const { db, client: connectedClient } = await connect();
            client = connectedClient;

            const endereco = await db.collection("enderecos").findOne({ _id: new ObjectId(id) });

            endereco ? console.log("Endereço encontrado:", endereco) : console.log("Endereço não encontrado.");

        } catch (error) {
            Logger.log("Erro ao obter endereço por ID: " + error);
        } finally {
            if (client) await client.close();
        }
    }

    async removerPorId(id) {
        let client;
        try {
            const { db, client: connectedClient } = await connect();
            client = connectedClient;

            const resultado = await db.collection("enderecos").deleteOne({ _id: new ObjectId(id) });

            console.log(resultado.deletedCount > 0 ? "Endereço removido com sucesso." : "Endereço não encontrado para remoção.");

        } catch (error) {
            Logger.log("Erro ao remover endereço por ID: " + error);
        } finally {
            if (client) await client.close();
        }
    }

    async atualizar(filtro, novosDados) {
        let client;
        try {
            if (!novosDados.rua || !novosDados.cep || !novosDados.logradouro) {
                throw new Error("Rua, CEP e logradouro são obrigatórios.");
            }

            const { db, client: connectedClient } = await connect();
            client = connectedClient;

            if (!/^\d{5}-\d{3}$/.test(novosDados.cep)) {
                throw new Error("CEP inválido (formato esperado: 12345-678).");
            }

            const resultado = await db.collection("enderecos").updateOne(filtro, { $set: novosDados });

            console.log(resultado.modifiedCount > 0 ? "Endereço atualizado com sucesso!" : "Endereço não encontrado para atualização.");

        } catch (error) {
            Logger.log("Erro ao atualizar endereço: " + error);
        } finally {
            if (client) await client.close();
        }
    }
}

module.exports = Endereco;
