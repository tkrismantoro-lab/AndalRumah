/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#D71920", dark: "#B0141A", soft: "#FDECEE" },
        navy: "#111827",
        soft: "#F8FAFC",
        line: "#E5E7EB",
        success: "#16A34A",
      },
      fontFamily: { sans: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"] },
      borderRadius: { card: "16px", btn: "10px" },
      boxShadow: { soft: "0 1px 2px rgba(17,24,39,.05), 0 10px 28px -12px rgba(17,24,39,.16)" },
    },
  },
  plugins: [],
};
