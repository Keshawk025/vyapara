/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#050816",
        panel: "#0c1020",
        line: "rgba(255,255,255,0.08)",
        ink: "#f4f7fb",
        muted: "#9aa4bd",
        accent: "#6ee7ff",
        glow: "#8b5cf6",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(0,0,0,0.28)",
        glow: "0 0 0 1px rgba(110,231,255,0.14), 0 22px 70px rgba(31,41,91,0.42)",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top left, rgba(110,231,255,0.14), transparent 28%), radial-gradient(circle at top right, rgba(139,92,246,0.18), transparent 32%), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
