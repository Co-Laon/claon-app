module.exports = {
  content: [
    './packages/climbingweb/pages/**/*.{js,ts,jsx,tsx}',
    './packages/climbingweb/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar-hide'),
    require('daisyui'),
  ],
};
