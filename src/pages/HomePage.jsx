import React, { useState } from "react";

const HomePage = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!url) return alert("Please paste a link");

    setLoading(true);
    setData(null);

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      });

      const result = await res.json();
      setData(result);
    } catch (err) {
      setData({ success: false, error: "Server error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <h1 style={styles.title}>AllDownloader</h1>
      <p style={styles.subtitle}>
        Download videos instantly from social media
      </p>

      {/* INPUT */}
      <div style={styles.box}>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste TikTok / Instagram link..."
          style={styles.input}
        />

        <button onClick={handleDownload} style={styles.button}>
          Download
        </button>
      </div>

      {/* LOADING */}
      {loading && <p>Processing...</p>}

      {/* RESULT */}
      {data && (
        <div style={styles.result}>
          {data.success ? (
            <>
              <h3>{data.data?.title}</h3>

              {data.data?.thumbnail && (
                <img
                  src={data.data.thumbnail}
                  alt="thumb"
                  style={{ width: "100%", borderRadius: 10 }}
                />
              )}

              {data.data?.formats?.map((f, i) => (
                <a
                  key={i}
                  href={f.url}
                  target="_blank"
                  style={styles.downloadBtn}
                >
                  Download {f.quality || "Video"}
                </a>
              ))}
            </>
          ) : (
            <p style={{ color: "red" }}>
              {data.error || "Failed to fetch video"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;

/* ===================== STYLES ===================== */
const styles = {
  container: {
    textAlign: "center",
    padding: 40,
    fontFamily: "Arial",
    background: "#f6f6f6",
    minHeight: "100vh"
  },
  title: {
    fontSize: 40,
    fontWeight: "bold"
  },
  subtitle: {
    color: "#666",
    marginBottom: 20
  },
  box: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20
  },
  input: {
    width: 300,
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ccc"
  },
  button: {
    padding: "12px 20px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer"
  },
  result: {
    marginTop: 20,
    maxWidth: 500,
    margin: "auto",
    background: "white",
    padding: 20,
    borderRadius: 10
  },
  downloadBtn: {
    display: "block",
    marginTop: 10,
    padding: 10,
    background: "#111",
    color: "white",
    borderRadius: 6,
    textDecoration: "none"
  }
};