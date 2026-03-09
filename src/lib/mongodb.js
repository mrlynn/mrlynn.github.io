import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'mlynn';

let client;
let clientPromise;

if (!uri) {
  throw new Error('MONGODB_URI environment variable is not set');
}

if (process.env.NODE_ENV === 'development') {
  // In dev, use a global variable to preserve the client across HMR
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create once per cold start
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;

export async function getDb() {
  const c = await clientPromise;
  return c.db(dbName);
}

export async function getCollection(name) {
  const db = await getDb();
  return db.collection(name);
}
