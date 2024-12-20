/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        'marck': ['Marck Script', 'cursive'],
        'protest': ['Protest Revolution', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 