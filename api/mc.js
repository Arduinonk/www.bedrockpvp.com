// api/mc.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "bedrockpvp5";
const collectionName = process.env.COLLECTION || "mcdata";

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

  return { db: cachedDb };
}

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const collection = db.collection(collectionName);

  // ======================== POST ===========================
  if (req.method === "POST") {
    const key = req.headers["x-api-key"];
    if (key !== process.env.MC_API_KEY) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const data = req.body; // PlayersDataForMongoDB
    if (!data) {
      return res.status(400).json({ error: "Missing body" });
    }

    // UPDATE exact document
    await collection.updateOne(
      { type: "onlineCountData" }, // filter
      {
        $set: {
          onlineCount: data.onlineCount,
          players: data.players,
          receivedAt: new Date()
        }
      },
      { upsert: true } // create if not exists
    );

    return res.status(200).json({ ok: true });
  }

  // ======================== GET ===========================
  if (req.method === "GET") {
    const latest = await collection.findOne({ type: "onlineCountData" });

    if (!latest) {
      return res.status(200).json({ error: "No data yet" });
    }

    return res.status(200).json(latest);
  }

  return res.status(405).send("Method Not Allowed");
}
