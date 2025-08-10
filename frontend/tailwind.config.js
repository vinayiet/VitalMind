/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        brand: {
          50: '#eefdf7',
          100: '#d6f8eb',
          200: '#b0efd8',
          300: '#7fe4c3',
          400: '#45d2a8',
          500: '#1ab78e',
          600: '#0f9473',
          700: '#10775e',
          800: '#115e4c',
          900: '#0f4d3f'
        }
      }
    }
  },
  plugins: []
};
