import { useState } from "react";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);

  const download = async () => {
    const res = await fetch("/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <h1>🔥 AllDownloader</h1>

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste link..."
        style={{ padding: 10, width: 300 }}
      />

      <button onClick={download} style={{ marginLeft: 10 }}>
        Download
      </button>

      <pre style={{ marginTop: 20 }}>
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
}