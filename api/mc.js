// api/mc.js
export default async function handler(req, res) {
  // Разрешаем только POST (Minecraft будет отправлять POST)
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  // Проверка простого ключа (рекомендуется для защиты)
  const apiKey = req.headers["x-api-key"] || req.headers["x-api-key".toLowerCase()];
  if (apiKey !== process.env.MC_API_KEY) {
    return res.status(403).json({ error: "Forbidden" });
  }

  // Vercel автоматически распарсит JSON body если Content-Type: application/json
  const data = req.body;

  // Тут делай что нужно: логирование, БД, файл и т.п.
  console.log("✅ Received from Minecraft:", data);

  // Ответ Minecraft
  return res.status(200).json({ ok: true, received: data });
}
