/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable semantic dark mode
  theme: {
    extend: {
      colors: {
        primary: "#ef4f5f", // Zomato Red
        secondary: "#fc8019", // Swiggy Orange
        background: "#ffffff",
        surface: "#f8f9fa",
        dark: {
          background: "#121212",
          surface: "#1e1e1e",
          border: "#2d2d2d"
        }
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
