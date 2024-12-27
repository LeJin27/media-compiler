/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      '_primary': '#ffffff',
      '_secondary': '#3f3cbb',
      '_control-bar': '#3f3cbb',

    }
  },
  plugins: [],
}
