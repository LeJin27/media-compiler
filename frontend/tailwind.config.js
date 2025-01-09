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
        '_header-bar': '#000000',
        '_card-color': '#0F0F0F',
        '_card-text-color': '#0F0F0F',
      }
    },
  },
  plugins: [],
}
