// src/components/McFeed.jsx
import React, { useEffect, useState } from "react";

export default function McFeed() {
  const [items, setItems] = useState([]);

  async function load() {
    const res = await fetch("/api/data?limit=50");
    const data = await res.json();
    setItems(data);
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 20000); // опрашивать каждые 5 секунд
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      <h2>Последние события от Minecraft</h2>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.player ? item.player : "unknown"} — {item.coins ?? item.kills ?? ""} — {new Date(item.receivedAt).toLocaleString()}
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
