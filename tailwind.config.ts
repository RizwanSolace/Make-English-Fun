import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: { DEFAULT: "#1FAFC7", light: "#6AD6DE", dark: "#0E7C8F" },
        orange: { DEFAULT: "#F97A2D", dark: "#C2410C" },
        amber: { DEFAULT: "#FFB319" },
        leaf: { yellow: "#FDE08B", peach: "#F9C195" },
        trunk: "#C5AFA0",
        ink: "#1F2937",
      },
      fontFamily: {
        heading: ['"Baloo 2"', "system-ui", "sans-serif"],
        body: ["Nunito", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 6px 20px rgba(31,41,55,0.10)",
      },
      keyframes: {
        sway: {
          "0%,100%": { transform: "rotate(-1.5deg)" },
          "50%": { transform: "rotate(1.5deg)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        sway: "sway 6s ease-in-out infinite",
        float: "float 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
