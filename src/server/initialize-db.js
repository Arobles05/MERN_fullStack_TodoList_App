import { defaulState, defaultState } from './defaultState';
import { connectDbMongo } from './connect-db';

async function initializeDB() {
    let db = await connectDbMongo();
    for (let collectionName in defaultState) {
        let collection = db.collection(collectionName);
        await collection.insertMany(defaultState[collectionName]);
    }
}

initializeDB();