const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ],
  theme: {
    extend: {
      colors: {
        'grey': {
          50: '#c1c1c1',
          300: '#7f8290',
          400: '#6b7280',
          800: '#16141a',
          900: '#09080a',
        },
        'light-grey': '#2c2f35',
        'background': '#100f13',
      },
      fontFamily: {
        display: ['Evolve', ...defaultTheme.fontFamily.sans],
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
}
