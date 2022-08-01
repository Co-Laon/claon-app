module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkmode: 'class',
  theme: {
    extend: {
      animation: {
        larger: 'larger 0.2s ease-out',
      },
      keyframes: {
        larger: {
          '0%': { transform: 'scale(0.2)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      colors: {
        white: '#FFFFFF',
        black: '#121212',
        gray: {
          100: '#FAFAFA',
          200: '#F2F2F2',
          300: '#E6E6E6',
          400: '#BFBFBF',
          500: '#808080',
          600: '#666666',
          700: '#404040',
          800: '#333333',
          900: '#000000',
        },
        orange: {
          500: '#FC7544',
        },
        red: {
          500: '#FF483B',
        },
        purple: {
          500: '#5953FF',
          600: '#433FBF',
        },
        yellow: {
          500: '#FFDE3B',
        }
      },
      minWidth: {
        20: '5rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar-hide'),
  ],
};
