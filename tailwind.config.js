/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        dd: '0.8rem',
        md: '1rem'
      }
    }
  },
  plugins: []
}
