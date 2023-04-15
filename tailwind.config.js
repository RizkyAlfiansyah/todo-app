/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#16ABF8',
        secondary: '#E5E5E5',
        tertiary: '#f4f4f4',
        error: '#ED4C5C',
        gray: {
          100: '#888888',
        },
      },
      borderRadius: {
        '4xl': '45px',
      },
      width: {
        semiFull: '980px',
      },
    },
  },
  plugins: [],
};
