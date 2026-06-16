import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cream: "#FFF9F0",
        beige: {
          DEFAULT: "#EADDC8",
          light: "#F5EDE0",
          dark: "#D8C9B0",
        },
        "farm-green": {
          DEFAULT: "#4E6B45",
          700: "#3A5234",
        },
        brown: {
          200: "rgba(107,79,58,0.2)",
          400: "#BEA898",
          500: "#A08070",
          600: "#8B6F5A",
          700: "#6B4F3A",
          800: "#4A3528",
          900: "#3A2818",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "in": "fadeIn 0.3s ease-out",
        "pulse": "pulse 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
