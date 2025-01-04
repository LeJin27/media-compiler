/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        '_primary': '#2C2E3A',
        '_secondary': '#3f3cbb',
        '_control-bar': '#3f3cbb',
      }
    },
  },
  plugins: [],
}
