const { MongoClient } = require('mongodb');

const dbName = process.env.NODE_ENV === 'test' ? 'pharmacy_test' : 'pharmacy';
const url = `mongodb://127.0.0.1:27017/${dbName}`;

let client;
let db;

async function connect() {
  if (!client) {
    client = new MongoClient(url);
    await client.connect();
    db = client.db();
  }
  return db;
}

async function close() {
  if (client) {
    await client.close();
    client = null;
  }
}

module.exports = { connect, close };
