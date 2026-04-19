import { createContext, useContext, useState } from "react";

const ATMOSPHERES = {
  default: {
    name: "Deep Cosmos",
    bg: "linear-gradient(180deg, #070b18 0%, #050816 50%, #04070f 100%)",
    blob1: "rgba(110, 231, 255, 0.13)",
    blob2: "rgba(139, 92, 246, 0.18)",
    borderColor: "rgba(255,255,255,0.08)",
    accent: "#00f6ff",
    icon: "🌌",
  },
  cyberpunk: {
    name: "Neon Cyberpunk",
    bg: "linear-gradient(180deg, #0a0012 0%, #050008 50%, #0d0018 100%)",
    blob1: "rgba(255, 0, 200, 0.25)",
    blob2: "rgba(0, 255, 120, 0.2)",
    borderColor: "rgba(255,0,200,0.2)",
    accent: "#ff00c8",
    icon: "⚡",
  },
  void: {
    name: "Cosmic Void",
    bg: "linear-gradient(180deg, #000000 0%, #030303 50%, #000000 100%)",
    blob1: "rgba(255, 255, 255, 0.04)",
    blob2: "rgba(200, 200, 255, 0.06)",
    borderColor: "rgba(255,255,255,0.04)",
    accent: "#ffffff",
    icon: "✦",
  },
  glass: {
    name: "Studio Glass",
    bg: "linear-gradient(180deg, #0f1520 0%, #0a1018 50%, #080d14 100%)",
    blob1: "rgba(200, 220, 255, 0.08)",
    blob2: "rgba(180, 200, 255, 0.06)",
    borderColor: "rgba(200,220,255,0.12)",
    accent: "#c8d8ff",
    icon: "◻",
  },
};

const AtmosphereContext = createContext(null);

export function AtmosphereProvider({ children }) {
  const [current, setCurrent] = useState("default");
  const atm = ATMOSPHERES[current];

  return (
    <AtmosphereContext.Provider value={{ current, setCurrent, atm, ATMOSPHERES }}>
      <div
        style={{
          background: atm.bg,
          "--atm-blob1": atm.blob1,
          "--atm-blob2": atm.blob2,
          "--atm-border": atm.borderColor,
          "--atm-accent": atm.accent,
          minHeight: "100vh",
          transition: "background 1.2s ease",
        }}
      >
        {children}
      </div>
    </AtmosphereContext.Provider>
  );
}

export function useAtmosphere() {
  return useContext(AtmosphereContext);
}

export { ATMOSPHERES };
