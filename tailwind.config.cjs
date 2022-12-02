/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  variants: {
    extend: {
      opacity: ['group-hover']
    }
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto']
      },
      colors: {
        'mercadolibre-primary': '#fff159',
        'mercadolibre-secondary': 'rgb(235 235 235)',
        'mercadolibre-logo': 'rgb(39 46 119)',
        'mercadolibre-btn': 'rgb(52 131 250)',
        'mercadolibre-btn-hover': 'rgb(41 104 200)'
      },
      animation: {
        enter: 'enter 1s forwards',
        exit: 'exit 1s forwards',
        rotate: 'rotate 500ms forwards',
        arrowForward: 'arrowForward 3s linear infinite'
      },
      keyframes: {
        arrowForward: {
          '0%': { transform: 'translateX(-100%)' },
          '32%': {
            transform: 'translateX(-100%)'
          },
          '33%': {
            transform: 'translateX(0)'
          },
          '66%': { transform: 'translateX(0)' },
          '67%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        enter: {
          '0%': {
            transform: 'translateX(1500px)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        },
        exit: {
          '0%': {
            transform: 'translateX(0)'
          },
          '100%': {
            transform: 'translateX(-1500px)'
          }
        },
        rotate: {
          '0%': {
            transform: 'rotate(0)'
          },
          '100%': {
            transform: 'rotate(360deg)'
          }
        }
      }
    }
  },
  plugins: []
}
