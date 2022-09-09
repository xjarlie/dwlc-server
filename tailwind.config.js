/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["views/partials/*.ejs", "views/*.ejs"],
  theme: {
    extend: {
      colors: {
        'tardis': '#003b6f'
      },
    },
  },
  plugins: [],
}
