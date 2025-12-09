// pages/api/mc.js
import { MongoClient } from "mongodb";

const {
  MONGODB_URI,
  DB_NAME = "bedrockpvp5",
  COLLECTION = "mcdata",
  MC_API_KEY
} = process.env;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI env missing");
}

let cachedClient = global._mongoClient || null;
let cachedDb = global._mongoDb || null;
let initPromise = global._mongoInitPromise || null; // гарантируем однократную инициализацию (индексы и т.д.)

async function connectToDatabase() {
  if (!cachedClient) {
    cachedClient = new MongoClient(MONGODB_URI);
    await cachedClient.connect();
    global._mongoClient = cachedClient;
  }
  if (!cachedDb) {
    cachedDb = cachedClient.db(DB_NAME);
    global._mongoDb = cachedDb;
  }

  // Инициализация выполняется один раз (например: создание индекса)
  if (!initPromise) {
    initPromise = (async () => {
      try {
        const coll = cachedDb.collection(COLLECTION);
        // Создайте индекс один раз (если нужен). Если индекс уже есть, команда быстая.
        await coll.createIndex({ type: 1 });
      } catch (err) {
        // не фаталимо — логируем
        console.warn("Index creation warning:", err);
      }
    })();
    global._mongoInitPromise = initPromise;
  }
  await initPromise;

  return { db: cachedDb };
}

function checkApiKey(req) {
  // Если вы хотите требовать ключ обязательно, замените на: return req.headers['x-api-key'] === MC_API_KEY;
  if (!MC_API_KEY) return true; // разрешаем, если ключ не задан (на dev)
  const key = req.headers["x-api-key"];
  return key === MC_API_KEY;
}

function ensureType(obj) {
  if (!obj || typeof obj !== "object") return null;
  if (!obj.type || typeof obj.type !== "string") return null;
  return obj.type;
}

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const coll = db.collection(COLLECTION);

    if (req.method === "POST") {
      if (!checkApiKey(req)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const body = req.body;
      const type = ensureType(body);
      if (!type) {
        return res.status(400).json({ error: "Missing or invalid 'type' field (string required)" });
      }

      // Приводим receivedAt к дате
      const receivedAt = body.receivedAt ? new Date(body.receivedAt) : new Date();

      // Если хотите заменять весь документ:
      const docToSave = { ...body, type, receivedAt };

      const result = await coll.replaceOne({ type }, docToSave, { upsert: true });

      return res.status(200).json({
        ok: true,
        matchedCount: result.matchedCount ?? 0,
        modifiedCount: result.modifiedCount ?? 0,
        upsertedId: result.upsertedId ?? null
      });
    }

    if (req.method === "GET") {
      const { type } = req.query;
      if (!type) return res.status(400).json({ error: "Query param 'type' is required" });

      const doc = await coll.findOne({ type: String(type) });
      if (!doc) return res.status(404).json({ error: "Not found" });
      return res.status(200).json(doc);
    }

    res.setHeader("Allow", "GET,POST");
    return res.status(405).end("Method Not Allowed");
  } catch (err) {
    console.error("api/mc error:", err);
    return res.status(500).json({ error: "Internal Server Error", message: err.message });
  }
}


// // // api/mc.js
// // import { MongoClient } from "mongodb";

// // const uri = process.env.MONGODB_URI;
// // const dbName = process.env.DB_NAME || "bedrockpvp5";
// // const collectionName = process.env.COLLECTION || "mcdata";

// // let cachedClient = global._mongoClient;
// // let cachedDb = global._mongoDb;

// // async function connectToDatabase() {
// //   if (!cachedClient) {
// //     cachedClient = new MongoClient(uri);
// //     await cachedClient.connect();
// //     global._mongoClient = cachedClient;
// //   }

// //   if (!cachedDb) {
// //     cachedDb = cachedClient.db(dbName);
// //     global._mongoDb = cachedDb;
// //   }

// //   return { db: cachedDb };
// // }

// // export default async function handler(req, res) {
// //   const { db } = await connectToDatabase();
// //   const collection = db.collection(collectionName);

// //   // ======================== POST ===========================
// //   if (req.method === "POST") {
// //     const key = req.headers["x-api-key"];
// //     if (key !== process.env.MC_API_KEY) {
// //       return res.status(403).json({ error: "Forbidden" });
// //     }

// //     const data = req.body; // PlayersDataForMongoDB
// //     if (!data) {
// //       return res.status(400).json({ error: "Missing body" });
// //     }
// //     if (data.type === 'pixelData') {
// //       // UPDATE exact document
// //       await collection.updateOne(
// //         { type: "pixelData" }, // filter
// //         {
// //           $set: data
// //         },
// //         { upsert: true } // create if not exists
// //       );
// //     } else {


// //       // UPDATE exact document
// //       await collection.updateOne(
// //         { type: "onlineCountData" }, // filter
// //         {
// //           $set: {
// //             onlineCount: data.onlineCount,
// //             players: data.players,
// //             receivedAt: new Date()
// //           }
// //         },
// //         { upsert: true } // create if not exists
// //       );
// //     }
// //     return res.status(200).json({ ok: true });
// //   }

// //   // ======================== GET ===========================
// //   if (req.method === "GET") {
// //     const latest = await collection.findOne({ type: "onlineCountData" });

// //     if (!latest) {
// //       return res.status(200).json({ error: "No data yet" });
// //     }

// //     return res.status(200).json(latest);
// //   }

// //   return res.status(405).send("Method Not Allowed");
// // }

// // pages/api/mc.js
// import { MongoClient } from "mongodb";

// const {
//   MONGODB_URI,
//   DB_NAME = "bedrockpvp5",
//   COLLECTION = "mcdata",
//   MC_API_KEY
// } = process.env;

// let cachedClient = global._mongoClient || null;
// let cachedDb = global._mongoDb || null;

// async function connectToDatabase() {
//   if (!MONGODB_URI) throw new Error("MONGODB_URI env missing");
//   if (!cachedClient) {
//     cachedClient = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//     await cachedClient.connect();
//     global._mongoClient = cachedClient;
//   }
//   if (!cachedDb) {
//     cachedDb = cachedClient.db(DB_NAME);
//     global._mongoDb = cachedDb;
//   }
//   return { db: cachedDb };
// }

// function checkApiKey(req) {
//   const key = req.headers["x-api-key"];
//   return MC_API_KEY ? key === MC_API_KEY : true;
// }

// function ensureType(doc) {
//   if (!doc || typeof doc !== "object") return null;
//   if (!doc.type || typeof doc.type !== "string") return null;
//   return doc.type;
// }

// export default async function handler(req, res) {
//   try {
//     const { db } = await connectToDatabase();
//     const coll = db.collection(COLLECTION);

//     // индекс для быстрого поиска по type
//     await coll.createIndex({ type: 1 }, { unique: false });

//     if (req.method === "POST") {
//       if (!checkApiKey(req)) return res.status(403).json({ error: "Forbidden" });

//       const body = req.body;
//       const type = ensureType(body);
//       if (!type) return res.status(400).json({ error: "Missing or invalid 'type' field (string required)" });

//       // подготовим документ для сохранения
//       // Нотация: полная замена содержимого документа для данного type,
//       // но сохраним/обновим receivedAt.
//       const receivedAt = body.receivedAt ? new Date(body.receivedAt) : new Date();
//       const docToSave = {
//         ...body,
//         type, // гарантируем корректный type
//         receivedAt
//       };

//       // replaceOne + upsert: полностью заменит существующий документ {type} на docToSave,
//       // или создаст новый, если не найден.
//       const result = await coll.replaceOne(
//         { type },          // filter
//         docToSave,         // replacement document
//         { upsert: true }   // create if not exists
//       );

//       // Ответ: информация о том, что произошло
//       return res.status(200).json({
//         ok: true,
//         matchedCount: result.matchedCount,
//         modifiedCount: result.modifiedCount,
//         upsertedId: result.upsertedId ?? null
//       });
//     }

//     if (req.method === "GET") {
//       // GET /api/mc?type=onlineCountData -> вернуть документ с таким type (последний сохранённый, т.к. заменяем весь документ)
//       const { type } = req.query;
//       if (!type) return res.status(400).json({ error: "Query param 'type' is required" });

//       const doc = await coll.findOne({ type: String(type) });
//       if (!doc) return res.status(404).json({ error: "Not found" });
//       return res.status(200).json(doc);
//     }

//     // прочие методы не поддерживаем
//     res.setHeader("Allow", "GET,POST");
//     return res.status(405).end("Method Not Allowed");
//   } catch (err) {
//     console.error("api/mc error:", err);
//     return res.status(500).json({ error: "Internal Server Error", message: err.message });
//   }
// }
