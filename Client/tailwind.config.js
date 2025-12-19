/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "soft-bg": "rgb(240,240,230)",
      },
    },
  },
  plugins: [],
};
