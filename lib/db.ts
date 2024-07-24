
// db.ts
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI is not defined in the environment variables.');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // En desarrollo, usa una variable global para mantener la conexión
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // En producción, conecta cada vez que se necesite
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

async function connectToDatabase() {
  try {
    const client = await clientPromise;
    return client.db('Blog'); // Reemplaza con el nombre de tu base de datos
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    throw new Error('Could not connect to the database');
  }
}

export { connectToDatabase };
