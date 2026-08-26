/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#12172b",
          soft: "#2b3050",
        },
        paper: {
          DEFAULT: "#f6f4ec",
          alt: "#fffdf8",
        },
        rule: {
          DEFAULT: "#dcd6c4",
          soft: "#e8e3d4",
        },
        muted: "#6a6f7d",
        signal: {
          DEFAULT: "#2f9e6e",
          soft: "#dcefe4",
        },
        amber: {
          DEFAULT: "#d98e3f",
          soft: "#f7e8d3",
        },
        info: {
          DEFAULT: "#3b6ea5",
          soft: "#dde8f2",
        },
        coral: {
          DEFAULT: "#c8583f",
          soft: "#f5ddd6",
        },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Inter", "-apple-system", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Courier New'", "monospace"],
      },
      boxShadow: {
        card: "0 18px 40px -20px rgba(18, 23, 43, 0.35)",
        pop: "3px 3px 0 rgba(18, 23, 43, 1)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: 1 },
          "50%, 100%": { opacity: 0 },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        blink: "blink 1s step-start infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
