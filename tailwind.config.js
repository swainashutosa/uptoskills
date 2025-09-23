// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // make sure Tailwind scans your files
  ],
  theme: {
    extend: {
      fontFamily: {
        // Default sans-serif font ko 'Inter' banaya
        sans: ["Inter", "sans-serif"],
        // Heading ke liye ek alag font 'Rajdhani' banaya
        heading: ["Rajdhani", "sans-serif"],
      },
      colors: {
        brown: {
          500: "#8B4513", // SaddleBrown
          700: "#5C3317", // Darker brown
          900: "#3E1E0B", // Very dark brown
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
