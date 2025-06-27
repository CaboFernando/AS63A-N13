const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "Projeto2DB";

async function connect() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);
        console.log("Conectado ao MongoDB!");
        return { db, client };
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        throw error;
    }
}

module.exports = { connect };