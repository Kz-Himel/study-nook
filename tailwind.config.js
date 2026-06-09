const heroui = require("@heroui/react").heroui;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./app/**/*.{js,jsx,mdx}",
  "./src/**/*.{js,jsx,mdx}",
  "./components/**/*.{js,jsx,mdx}",
  "./node_modules/@heroui/theme/dist/**/*.{js,jsx}"
],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "sans-serif"],
        display: ["var(--font-plus-jakarta)", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#eff0ff",
          100: "#e2e3ff",
          200: "#c8caff",
          300: "#a4a7fe",
          400: "#7c7ef9",
          500: "#5b54f1",
          600: "#4f3fe6",
          700: "#4431cb",
          800: "#3828a4",
          900: "#312682",
          950: "#1e164c",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [heroui()],
};