// api/mc.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "bedrock";
const collName = process.env.COLLECTION || "mc_logs";

// для re-use соединения между вызовами (важно для serverless)
let cachedClient = global._mongoClient;
let cachedDb = global._mongoDb;

if (!cachedClient) {
  cachedClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  global._mongoClient = cachedClient;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  // простой API key (защита)
  const key = req.headers["x-api-key"];
  if (key !== process.env.MC_API_KEY) return res.status(403).json({ error: "Forbidden" });

  const payload = req.body;
  if (!payload) return res.status(400).json({ error: "Missing body" });

  try {
    if (!cachedClient.isConnected && !cachedClient.topology) {
      await cachedClient.connect();
    } else if (!cachedClient.isConnected()) {
      await cachedClient.connect();
    }
  } catch (err) {
    // в новых драйверах isConnected отсутствует; безопасно пытаться connect
    try { await cachedClient.connect(); } catch(e) { console.error(e); }
  }

  const db = cachedClient.db(dbName);
  const coll = db.collection(collName);

  // добавим поле времени
  const doc = {
    ...payload,
    receivedAt: new Date(),
  };

  await coll.insertOne(doc);

  return res.status(200).json({ ok: true });
}
