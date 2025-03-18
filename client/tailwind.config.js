/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#111827',  // gray-900
        secondary: '#1f2937', // gray-800
        tertiary: '#374151',  // gray-700
        accent: '#3b82f6',    // blue-500
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -15px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 20px 30px -15px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
} 