/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        inter: ["Inter", "sans-serif"],
      },
      boxShadow: {
        "3xl": "0 65px 70px -15px rgba(0, 0, 0, 0.5)",
      },
      colors: {
        // Custom dark mode colors
        dark: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
    },
    safelist: [
      "bg-gradient-to-r",
      "from-[#006663]",
      "to-[#111111]",
      "from-[#ff7e5f]",
      "to-[#feb47b]",
    ],
  },
  plugins: [],
};
