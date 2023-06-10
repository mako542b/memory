/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'xs': '320px',
        'xsm': '410px',
        // => @media (min-width: 992px) { ... }
      },
      width: {
        'minMax' : 'min(90%, 30rem)',
        'clamp' : 'clamp(48px,calc(3rem+((1vw-2.5px)*20)),80px);'
      }
    },
  },
  plugins: [],
}
