const MongoClient = require('mongodb').MongoClient;

module.exports = class Posts {
    static async find(busca) {
        const conn = await MongoClient.connect('mongodb://localhost:27017/exemplo01');
        const db =conn.db();

        if(busca)
            return await db.collection('posts').find({content: new RegExp(busca, 'i')}).toArray();

        return await db.collection('posts').find().toArray();
    }
}