const { connect } = require("../config/db");
const bcrypt = require("bcryptjs");
const { ObjectId } = require('mongodb');

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    async register() {
        let client;
        try {
            const { db, client: connectedClient } = await connect();
            client = connectedClient;

            const existingUser = await db.collection("users").findOne({ username: this.username });
            if (existingUser) {
                throw new Error("Nome de usuário já existe.");
            }

            const hashedPassword = await bcrypt.hash(this.password, 10);

            const result = await db.collection("users").insertOne({
                username: this.username,
                password: hashedPassword,
                createdAt: new Date()
            });
            console.log("Usuário registrado:", result.insertedId);
            return result.insertedId;
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            throw error;
        } finally {
            if (client) await client.close();
        }
    }

    static async findByUsername(username) {
        let client;
        try {
            const { db, client: connectedClient } = await connect();
            client = connectedClient;
            const user = await db.collection("users").findOne({ username: username });
            return user;
        } catch (error) {
            console.error("Erro ao buscar usuário por nome de usuário:", error);
            return null;
        } finally {
            if (client) await client.close();
        }
    }

    static async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}

module.exports = User;