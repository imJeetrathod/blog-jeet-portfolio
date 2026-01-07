/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#ffffff',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.35)',
      },
      lineClamp: {
        2: '2',
        3: '3',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};