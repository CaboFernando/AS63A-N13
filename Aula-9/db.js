const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
//const url = "mongodb://localhost:1";

const dbName = "ecommerce";

async function connect() {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    return { db, client };
};

module.exports = { connect };