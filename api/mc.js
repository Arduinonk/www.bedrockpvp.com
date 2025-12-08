// api/mc.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "bedrockpvp5";
const collectionName = process.env.COLLECTION || "mcdata";

// Кэшируем соединения (важно для serverless)
let cachedClient = global._mongoClient;
let cachedDb = global._mongoDb;

async function connectToDatabase() {
  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
    global._mongoClient = cachedClient;
  }

  if (!cachedDb) {
    cachedDb = cachedClient.db(dbName);
    global._mongoDb = cachedDb;
  }

  return { client: cachedClient, db: cachedDb };
}

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const collection = db.collection(collectionName);

  // ============ POST: принимаем данные от Minecraft ============
  if (req.method === "POST") {
    const key = req.headers["x-api-key"];
    if (key !== process.env.MC_API_KEY) {
      return res.status(403).json({ error: "Forbidden" });
    }

    if (!req.body) {
      return res.status(400).json({ error: "Missing body" });
    }

    const doc = {
      ...req.body,
      receivedAt: new Date()
    };

    await collection.insertOne(doc);

    return res.status(200).json({ ok: true });
  }

  // ============ GET: отдаём последние данные ============
  if (req.method === "GET") {
    const latest = await collection
      .find()
      .sort({ receivedAt: -1 })
      .limit(1)
      .toArray();

    if (!latest.length) {
      return res.status(200).json({ error: "No data yet" });
    }

    return res.status(200).json(latest[0]);
  }

  return res.status(405).send("Method Not Allowed");
}

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).send("Method NOT Allowed");
//   }

//   const key = req.headers["x-api-key"];
//   if (key !== process.env.MC_API_KEY) {
//     return res.status(403).json({ error: "Forbidden" });
//   }

//   const payload = req.body;
//   if (!payload) {
//     return res.status(400).json({ error: "Missing body" });
//   }

//   // просто логируем (vercel покажет в логах)
//   console.log("MC received:", payload);

//   return res.status(200).json({ ok: true });
// }
