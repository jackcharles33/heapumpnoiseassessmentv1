/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'mint': {
          400: '#4FFFB0',
        }
      }
    },
  },
  plugins: [],
};