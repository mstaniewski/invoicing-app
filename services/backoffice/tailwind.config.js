/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        text: "#000",
        background: "#ebf0ff",
        primary: "#5c86ff",
        secondary: "#05a",
        accent: "#609",
        muted: "#f6f6f6",
      },
    },
  },
  plugins: [],
};
