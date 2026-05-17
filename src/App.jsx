import React from "react";

export default function App() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>MyApp</h1>

        <input style={styles.input} placeholder="Email or Phone" />
        <input style={styles.input} type="password" placeholder="Password" />

        <button style={styles.loginBtn}>Log In</button>

        <p style={styles.forgot}>Forgotten password?</p>

        <hr />

        <button style={styles.createBtn}>Create New Account</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f2f5",
  },
  card: {
    width: 350,
    padding: 20,
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    color: "#1877f2",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
    border: "1px solid #ddd",
  },
  loginBtn: {
    width: "100%",
    padding: 12,
    background: "#1877f2",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold",
  },
  forgot: {
    color: "#1877f2",
    fontSize: 14,
    margin: "10px 0",
  },
  createBtn: {
    width: "100%",
    padding: 12,
    background: "#42b72a",
    color: "white",
    border: "none",
    borderRadius: 6,
    fontWeight: "bold",
    cursor: "pointer",
  },
};