/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./index.html",
  "./src/**/*.{vue,js}"
  ],
  theme: {
    extend: {
      colors:{
        'light-green':'#3C8F7C',
        

      },
      fontFamily:{
        'playfair':['Playfair Display']
      },
    },


  },
  plugins: [
      require("tw-elements/plugin.cjs")
  ],
}

