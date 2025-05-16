const { connect } = require("./db");
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
            console.log("Usuário inserido:", result.insertedId);
            client.close();
        } catch (error) {
            console.log("Erro ao inserir usuário:", error);
        }
    }
};

module.exports = Usuario;