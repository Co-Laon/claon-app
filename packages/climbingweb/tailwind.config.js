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
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
