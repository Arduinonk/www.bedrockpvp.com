// api/data.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "bedrock";
const collName = process.env.COLLECTION || "mc_logs";

let cachedClient = global._mongoClient2;

if (!cachedClient) {
  cachedClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  global._mongoClient2 = cachedClient;
}

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end("Method Not Allowed");

  try {
    await cachedClient.connect();
    const db = cachedClient.db(dbName);
    const coll = db.collection(collName);

    // параметр ?limit=20
    const limit = Math.min(100, parseInt(req.query.limit || "20", 10));
    const docs = await coll.find({}).sort({ receivedAt: -1 }).limit(limit).toArray();

    return res.status(200).json(docs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal" });
  }
}
