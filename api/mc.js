
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method NOT Allowed");
  }

  const key = req.headers["x-api-key"];
  if (key !== process.env.MC_API_KEY) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const payload = req.body;
  if (!payload) {
    return res.status(400).json({ error: "Missing body" });
  }

  // просто логируем (vercel покажет в логах)
  console.log("MC received:", payload);

  return res.status(200).json({ ok: true });
}
