import { MongoClient } from 'mongodb';
const url = `mongodb://localhost:27017/taskStatusList`;
let db = null;

export async function connectDbMongo() {
    if (db) return db;

    let client = await MongoClient.connect(url, { useNewUrlParser: true });
    db = client.db();
    console.info("Got DB", db);
    return db;
}

//connectDbMongo();