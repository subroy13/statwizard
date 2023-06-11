/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./content/**/*.{html,js}", 
    "./layouts/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("tw-elements/dist/plugin.cjs")
  ],
}

