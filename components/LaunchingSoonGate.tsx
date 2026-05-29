"use client";

import { useEffect, useState } from "react";

const PASSWORD = "winner";
const STORAGE_KEY = "rg-preview-access";

export default function LaunchingSoonGate() {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("access") === PASSWORD) {
      window.localStorage.setItem(STORAGE_KEY, "1");
      setUnlocked(true);
      window.history.replaceState({}, "", window.location.pathname);
      return;
    }
    setUnlocked(window.localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim().toLowerCase() === PASSWORD) {
      window.localStorage.setItem(STORAGE_KEY, "1");
      setUnlocked(true);
    } else {
      setError(true);
    }
  }

  if (unlocked === null) {
    return <div style={{ position: "fixed", inset: 0, background: "#21130C", zIndex: 99999 }} />;
  }
  if (unlocked) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#21130C",
        color: "#F6F0E5",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', 'Helvetica Neue', system-ui, -apple-system, sans-serif",
        padding: "32px",
      }}
    >
      <div style={{ maxWidth: "600px", width: "100%", textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            padding: "10px 16px",
            border: "1px solid #8C6A3F",
            borderRadius: "999px",
            color: "#B89968",
            fontSize: "11px",
            letterSpacing: "3px",
            fontWeight: 600,
            textTransform: "uppercase",
            marginBottom: "32px",
          }}
        >
          Rothenbury Group
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(48px, 8vw, 84px)",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            margin: "0 0 16px",
            lineHeight: 1.05,
          }}
        >
          Launching Soon
        </h1>
        <p
          style={{
            fontSize: "18px",
            lineHeight: 1.55,
            color: "rgba(246, 240, 229, 0.78)",
            margin: "0 0 48px",
            maxWidth: "500px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          A diversified holding group building permanent operating businesses across real estate, services, media, and technology.
        </p>
        <div
          style={{
            borderTop: "1px solid rgba(246, 240, 229, 0.15)",
            paddingTop: "32px",
          }}
        >
          <form onSubmit={submit} style={{ display: "flex", gap: "8px", maxWidth: "320px", margin: "0 auto" }}>
            <input
              type="password"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError(false);
              }}
              placeholder="Client access"
              style={{
                flex: 1,
                background: "rgba(246, 240, 229, 0.08)",
                border: error ? "1px solid #F87171" : "1px solid rgba(246, 240, 229, 0.2)",
                borderRadius: "6px",
                padding: "10px 14px",
                color: "#F6F0E5",
                fontSize: "14px",
                outline: "none",
                fontFamily: "inherit",
              }}
              autoComplete="off"
            />
            <button
              type="submit"
              style={{
                background: "#8C6A3F",
                color: "#F6F0E5",
                border: "none",
                borderRadius: "6px",
                padding: "10px 20px",
                fontWeight: 600,
                fontSize: "14px",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Enter
            </button>
          </form>
          {error && (
            <p style={{ color: "#F87171", fontSize: "12px", marginTop: "12px", marginBottom: 0 }}>
              Incorrect access code.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
