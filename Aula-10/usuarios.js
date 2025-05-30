const { connect } = require("./db");
const Logger = require("./logger");

class Usuario {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }
    async inserir() {
        try {
            const { db, client } = await connect();
            const result = await db.collection("usuarios").insertOne({
                nome: this.nome,
                email: this.email,
            });
            Logger.log("Usuário inserido:", result.insertedId);
            client.close();
        } catch (error) {
            Logger.log("Erro ao inserir usuário!" + error);
        }
    }

    static async atualizar(filtro, novosDados) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("usuarios").updateMany(filtro, {
                $set: novosDados,
            });
            console.log("Usuário atualizado!", result.modifiedCount);
            client.close();
        } catch (error) {
            Logger.log("Erro ao atualizar usuário!" + error);
        }
    }

    static async buscar(filtro={}) {
        try {
            const { db, client } = await connect();
            const usuarios = await db.collection("usuarios").find(filtro).ToArray();
            console.log("Usuário encontrado!", usuarios);
            client.close();
        } catch (error) {
            Logger.log("Erro ao encontrar usuário!" + error);
        }
    }

    static async apagar(filtro) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("usuarios").deleteMany(filtro);
            console.log("Usuário apagado!", result.deletedCount);
            client.close();
        } catch (error) {
            Logger.log("Erro ao apagar usuário!" + error);
        }
    }
};

module.exports = Usuario;