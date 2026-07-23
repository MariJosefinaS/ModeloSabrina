import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFF9F3",
        sky: "#8ECAE6",
        skysoft: "#BFE3FF",
        peach: "#FFD8BE",
        mint: "#CDEAC0",
        lavender: "#E4D6F5",
        sunshine: "#FFE8A3",
        bubble: "#FFC9DE",
        grape: "#8367C7",
        cocoa: "#6B4F4F",
        marca: "#0056A2",
        marcaSoft: "#3E86C6",
      },
      fontFamily: {
        display: ["var(--font-fredoka)", "system-ui", "sans-serif"],
        body: ["var(--font-nunito)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 40px -12px rgba(0, 86, 162, 0.28)",
        pop: "0 10px 0 0 rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
