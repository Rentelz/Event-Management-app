/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customGray: "#F9FAFB", // Light background
        primaryBlue: "#2563EB", // You can also use #1D4ED8
        accentOrange: "#F97316",
        accentPink: "#EC4899",
        grayText: "#9CA3AF", // Light gray for text
        grayBorder: "#4B5563", // Dark gray for borders
        errorRed: "#DC2626", // Red for error messages
        successGreen: "#16A34A", // Green for success notifications
      },
    },
  },
  plugins: [],
};
