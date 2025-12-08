// src/McFeed.tsx
import  { useEffect, useState } from "react";

type McItem = {
  _id?: string;
  player?: string;
  coins?: number;
  kills?: number;
  receivedAt?: string | Date;
  [k: string]: any;
};

type Props = {
  /**
   * Optional API key to send as `x-api-key` header.
   * If you don't use API auth, omit this prop.
   */
  apiKey?: string;
  /**
   * Poll interval in ms (default 5000).
   */
  intervalMs?: number;
  /**
   * Maximum number of items to request from API.
   */
  limit?: number;
};

export default function McFeed({ apiKey, intervalMs = 5000, limit = 50 }: Props) {
  const [items, setItems] = useState<McItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const url = `/api/data?limit=${encodeURIComponent(String(limit))}`;

      const headers: Record<string, string> = {
        "Accept": "application/json",
      };
      if (apiKey) headers["x-api-key"] = apiKey;

      const res = await fetch(url, { method: "GET", headers });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${text}`);
      }

      const data = (await res.json()) as McItem[];
      // normalize dates to ISO string for display
      const normalized = data.map(d => ({
        ...d,
        receivedAt: d.receivedAt ? String(d.receivedAt) : undefined,
      }));
      setItems(normalized);
    } catch (e: any) {
      console.error("McFeed load error:", e);
      setError(e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, intervalMs);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, intervalMs, limit]);

  return (
    <div style={{ padding: 12 }}>
      <h3 style={{ marginTop: 0 }}>Minecraft feed</h3>

      <div style={{ marginBottom: 8 }}>
        <small style={{ color: "#666" }}>
          Showing latest {limit} items. Auto-refresh every {intervalMs / 1000} s.
        </small>
      </div>

      {loading && <div>Loading…</div>}
      {error && (
        <div style={{ color: "crimson", marginBottom: 8 }}>
          Error: {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && <div>No data yet.</div>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item) => {
          const key = String(item._id ?? item.receivedAt ?? Math.random().toString(36).slice(2));
          return (
            <li key={key} style={{ marginBottom: 12, borderBottom: "1px solid #eee", paddingBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <strong>{item.player ?? "unknown"}</strong>
                  <div style={{ fontSize: 12, color: "#666" }}>
                    {item.coins !== undefined ? `coins: ${item.coins}` : ""}
                    {item.kills !== undefined ? ` ${item.kills}` : ""}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "#888", whiteSpace: "nowrap" }}>
                  {item.receivedAt ? new Date(item.receivedAt).toLocaleString() : ""}
                </div>
              </div>

              <pre style={{ whiteSpace: "pre-wrap", marginTop: 8, background: "#fafafa", padding: 8, borderRadius: 6 }}>
                {JSON.stringify(item, null, 2)}
              </pre>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
