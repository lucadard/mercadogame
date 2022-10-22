/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  variants: {
    extend:{
      opacity: ['group-hover']
    }
  },
  theme: {
    extend: {
      animation: {
        enter: 'enter 500ms forwards'
      },
      keyframes: {
        enter: {
          '0%': {
            transform: 'translateX(1000px)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        }
      }
    }
  },
  plugins: []
}
