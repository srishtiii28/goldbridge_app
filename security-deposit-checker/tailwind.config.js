/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3e2',
          100: '#fce7c6',
          200: '#f9ce8d',
          300: '#f7b654',
          400: '#f49d1b',
          500: '#d88419',
          600: '#bc6c17',
          700: '#a05415',
          800: '#843c13',
          900: '#682411',
        },
        goldbridge: {
          gold: '#D4AF37',
          'gold-light': '#F4E4B9',
          'gold-dark': '#B8941F',
        }
      },
    },
  },
  plugins: [],
}
