const { connect } = require("../db");
const { ObjectId } = require('mongodb');


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
            const result = await db.collection("enderecos").insertOne({
                rua: this.rua,
                numero: this.numero,
                cep: this.cep,
                logradouro: this.logradouro,
                isAtivo: this.isAtivo
            });

            console.log("Endereço inserido:", result.insertedId);
            client.close();

        } catch (error) {
            console.log("Erro ao inserir endereço:", error);
        }
    }

    async listar() {
        try {
            const { db, client } = await connect();
            const result = await db.collection("enderecos").find().toArray();

            console.log("Endereços listados:", result);
            client.close();
            return result;

        } catch (error) {
            console.log("Erro ao listar os endereços:", error);
        }
    }

    async obterPorId(id) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("enderecos").findOne({ _id: new ObjectId(id) });

            if (result) {
                console.log("Endereço encontrado:", result);
            } else {
                console.log("Endereço não encontrado.");
            }

            client.close();

        } catch (error) {
            console.log("Erro ao obter endereço por ID:", error);
        }
    }

    async removerPorId(id) {
        try {
            const { db, client } = await connect();
            const resultado = await db.collection("enderecos").deleteOne({ _id: new ObjectId(id) });

            if (resultado.deletedCount > 0) {
                console.log("Endereço removido com sucesso.");
            } else {
                console.log("Endereço não encontrado para remoção.");
            }

            client.close();
        } catch (error) {
            console.log("Erro ao remover endereço por ID:", error);
        }
    }

    async atualizar() {
        try {
            const { db, client } = await connect();
            const resultado = await db.collection("enderecos").updateOne(
                { _id: new ObjectId(this._id) },
                {
                    $set: {
                        rua: this.rua,
                        numero: this.numero,
                        complemento: this.complemento,
                        bairro: this.bairro,
                        cidade: this.cidade,
                        estado: this.estado,
                        cep: this.cep
                    }
                }
            );

            if (resultado.modifiedCount > 0) {
                console.log("Endereço atualizado com sucesso.");
            } else {
                console.log("Endereço não encontrado para atualização.");
            }

            client.close();
        } catch (error) {
            console.log("Erro ao atualizar endereço:", error);
        }
    }

};

module.exports = Endereco;