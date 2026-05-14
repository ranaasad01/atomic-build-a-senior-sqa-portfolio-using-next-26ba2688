import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        slate: {
          950: "#020617",
        },
        emerald: {
          400: "#34d399",
          500: "#10b981",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Courier New", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "blink": "blink 1s step-end infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-up": "slide-in-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.8s ease-out forwards",
        "flow-line": "flow-line 1.5s ease-out forwards",
        "dot-pulse": "dot-pulse 1.4s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 10px rgba(16, 185, 129, 0.4)" },
          "50%": { boxShadow: "0 0 25px rgba(16, 185, 129, 0.8), 0 0 50px rgba(16, 185, 129, 0.3)" },
        },
        "slide-in-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "flow-line": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "dot-pulse": {
          "0%, 80%, 100%": { transform: "scale(0.8)", opacity: "0.5" },
          "40%": { transform: "scale(1.2)", opacity: "1" },
        },
      },
      boxShadow: {
        "emerald-glow": "0 0 20px rgba(16, 185, 129, 0.4), 0 0 40px rgba(16, 185, 129, 0.1)",
        "emerald-glow-sm": "0 0 10px rgba(16, 185, 129, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
