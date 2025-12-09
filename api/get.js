// pages/api/api.get.js
import { MongoClient } from "mongodb";

const {
  MONGODB_URI,
  DB_NAME = "bedrockpvp5",
  COLLECTION = "mcdata",
} = process.env;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI env missing");
}

/**
 * Simple cached Mongo client for Next.js serverless environment.
 */
let cachedClient = global._mongoClient || null;
let cachedDb = global._mongoDb || null;
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
  return { db: cachedDb };
}

/**
 * Very simple in-memory rate limiter per IP:
 * Map<ip, lastRequestTs>
 * Allows 1 request per COOLDOWN_MS from same IP.
 *
 * Note: in-memory limiter works for single process. If you run multiple instances,
 * consider Redis or another shared store for global limiting.
 */
const COOLDOWN_MS = 2000; // 1 second cooldown
const ipMap = new Map();

// Cleanup entries older than CLEANUP_AGE to avoid memory growth
const CLEANUP_AGE = 60 * 1000; // 60s

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function checkAndUpdateRateLimit(ip) {
  const now = Date.now();

  // cleanup occasionally (cheap)
  for (const [key, ts] of ipMap) {
    if (now - ts > CLEANUP_AGE) ipMap.delete(key);
  }

  const last = ipMap.get(ip) || 0;
  const elapsed = now - last;
  if (elapsed < COOLDOWN_MS) {
    const retryAfterSec = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
    return { allowed: false, retryAfterSec, remainingMs: COOLDOWN_MS - elapsed };
  }

  ipMap.set(ip, now);
  return { allowed: true };
}

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).end("Method Not Allowed");
    }

    // type param: ?type=onlineCountData
    const { type } = req.query;
    if (!type) return res.status(400).json({ error: "Query param 'type' is required" });

    // rate limit per IP
    const ip = getClientIp(req);
    const rl = checkAndUpdateRateLimit(ip);
    if (!rl.allowed) {
      res.setHeader("Retry-After", String(rl.retryAfterSec));
      return res.status(429).json({ error: "Too Many Requests", retryAfter: rl.retryAfterSec });
    }

    // fetch from Mongo
    const { db } = await connectToDatabase();
    const coll = db.collection(COLLECTION);

    const doc = await coll.findOne({ type: String(type) });
    if (!doc) return res.status(404).json({ error: "Not found" });

    // Optionally hide internal fields:
    // const { _id, ...payload } = doc;
    // return res.status(200).json(payload);

    // Return raw document as JSON; browser will display it
    res.setHeader("Content-Type", "application/json");
    // Optional: avoid aggressive caching by proxies/browsers
    res.setHeader("Cache-Control", "no-store"); // change if you'd like caching
    return res.status(200).json(doc); // typeof doc ==  
  } catch (err) {
    console.error("api.get error:", err);
    return res.status(500).json({ error: "Internal Server Error", message: err.message });
  }
}
