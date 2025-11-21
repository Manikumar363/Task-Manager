module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#e6eeff',
          200: '#c8ddff',
          300: '#9dbbff',
          400: '#6d95ff',
          500: '#3e6bff',
          600: '#355bd6',
          700: '#2c47a8',
          800: '#223376',
          900: '#171f44'
        },
        accent: {
          50: '#fff5f8',
          100: '#ffe6ef',
          200: '#ffcce0',
          300: '#ffa8c2',
          400: '#ff79a0',
          500: '#ff3f75',
          600: '#db2f61',
          700: '#a82345',
          800: '#78162f',
          900: '#4b0b18'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    },
  },
  plugins: [],
}
