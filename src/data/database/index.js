const { MongoClient } = require("mongodb");
require("dotenv").config();

const _mongoURL = process.env.DATABASE_URL;
const _dbName = process.env.DATABASE_NAME || "admin";

let _client;
let _db;

async function connectDatabase(mongoURL = _mongoURL, dbName = _dbName) {
    if (_db) return _db;

    _client = await MongoClient.connect(mongoURL);
    _db = _client.db(dbName);

    console.log("Connected to MongoDB");

    return _db;
}

async function listTables() {
    const db = await connectDatabase();
    const collections = await db.collections();
    const tableNames = collections.map(c => c.collectionName);

    tableNames.forEach(name => console.log(` - ${name}`));

    return tableNames;
}

async function insertTable(tableName, data) {
    const db = await connectDatabase();

    const result = await db.collection(tableName).insertOne(data);

    return result;
}

module.exports = {
    connectDatabase,
    listTables,
    insertTable
};