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

function getDatabase() {
    if (!_db) {
        throw new Error("Database not connected. Call connectDatabase() first.");
    }

    return _db;
}


async function listTables() {
    const db = getDatabase();
    const collections = await db.listCollections().toArray();
    const tableNames = collections.map(c => c.name);

    tableNames.forEach(name => console.log(` - ${name}`));

    return tableNames;
}

function getTable(tableName) {
    const db = getDatabase();
    const collection = db.collection(tableName);

    return collection;
}

async function insertTable(tableName, data) {
    const db = getDatabase();
    const table = getTable(tableName);

    const result = await table.insertOne(data);

    return result;
}

module.exports = {
    connectDatabase,
    getDatabase,
    getTable,
    listTables,
    insertTable
};