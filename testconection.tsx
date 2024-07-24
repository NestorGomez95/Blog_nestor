// testConnection.js
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI;

async function testConnection() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Connected to the database!');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  } finally {
    await client.close();
  }
}

testConnection();
