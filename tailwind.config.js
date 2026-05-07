/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#6C9EFF",
        "brand-secondary": "#FFB84D",
        primary: "#4CAF93",
        accent: "#FF6B8A",
        surface: "#FFFFFF",
        "app-bg": "#F7FAFC",
        "text-main": "#1F2937",
        "text-light": "#6B7280",
        "app-border": "#E5E7EB",
        success: "#34D399",
        warning: "#FBBF24",
        error: "#F87171",
        "dark-bg": "#0f0f13",
      },
      borderRadius: {
        sm: "8px",
        md: "16px",
        lg: "24px",
      },
      fontFamily: {
        main: ["Nunito", "Poppins", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 6px rgba(0,0,0,0.05)",
        card: "0 6px 12px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};