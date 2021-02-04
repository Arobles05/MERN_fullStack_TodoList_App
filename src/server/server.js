import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDbMongo } from './connect-db'
let port = 9999;
let app = express();

app.listen(port, console.log("Server starting and listenig on port ", port));


// app.get('/', (req, res) => {
//     res.send("Hellos...")
// });

app.use(
    cors(),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
);

const getDbCollection = async collectionName => {
    let db = await connectDbMongo();
    return db.collection(collectionName);

}
export const addNewTask = async task => {
    console.log("llegandoooo")
    let db = await connectDbMongo();
    let collection = db.collection(`tasks`);
    await collection.insertOne(task);
}
export const updateTask = async task => {
    let { id, group, name, isComplete } = task;
    let collection = getDbCollection(`tasks`);

    if (group) {
        await collection.updateOne({ id }, { $set: { group } });
    }


    if (name) {
        await collection.updateOne({ id }, { $set: { name } });
    }

    if (isComplete !== undefined) {
        await collection.updateOne({ id }, { $set: { isComplete } });
    }

}
app.post('/task/new', async(req, res) => {
    let task = req.body.task;
    await addNewTask(task);
    res.status(200).send();
})

app.post('/task/update', async(req, res) => {
    let task = req.body.task;
    await updateTask(task);
    res.status(200).send();
})