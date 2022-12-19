/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        app: '600px',
      },
      colors: {
        zaxe: '#009ade',
        'zaxe-black': '#060608',
        'zaxe-white': '#f6f6f6',
      },
      fontFamily: {
        zaxe: 'Mark',
        mark: 'Mark',
      },
      maxHeight: {
        max3xl: '500px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
