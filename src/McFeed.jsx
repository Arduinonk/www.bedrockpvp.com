// src/McFeed.jsx
import React, { useEffect, useState } from "react";

export default function McFeed() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/data?limit=50");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setItems(data);
    } catch (e) {
      console.error("Failed to load mc data", e);
      setError(e.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 5000); // poll every 5s
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ padding: 12 }}>
      <h3>Minecraft feed</h3>

      {loading && <div>Loading…</div>}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}

      {!loading && !error && items.length === 0 && <div>No data yet.</div>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item) => {
          const id = item._id ?? item.receivedAt ?? Math.random();
          return (
            <li key={id} style={{ marginBottom: 12, borderBottom: "1px solid #eee", paddingBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <strong>{item.player ?? "unknown"}</strong>
                  <div style={{ fontSize: 12, color: "#666" }}>
                    {item.coins !== undefined ? `coins: ${item.coins}` : ""}
                    {item.kills !== undefined ? ` ${item.kills}` : ""}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "#888" }}>
                  {item.receivedAt ? new Date(item.receivedAt).toLocaleString() : ""}
                </div>
              </div>
              <pre style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>{JSON.stringify(item, null, 2)}</pre>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
