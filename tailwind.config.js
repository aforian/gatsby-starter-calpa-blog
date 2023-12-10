/* eslint-disable global-require */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        header: '52px',
      },
      screens: {
        'lg-pad': '1150px',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
  darkMode: 'class',
};
