const defaultTheme = require('tailwindcss/defaultTheme')
const animate = require('tailwindcss-animate')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  prefix: '',

  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        display: ['Evolve', ...defaultTheme.fontFamily.sans],
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        purple: {
          50: 'hsl(var(--purple-50) / <alpha-value>)',
          400: 'hsl(var(--purple-400) / <alpha-value>)',
          500: 'hsl(var(--purple-500) / <alpha-value>)',
        },
        pink: {
          500: 'hsl(var(--pink-500) / <alpha-value>)',
        },
        red: {
          400: 'hsl(var(--red-400) / <alpha-value>)',
          500: 'hsl(var(--red-500) / <alpha-value>)',
        },
        white: 'hsl(var(--white) / <alpha-value>)',
        'white-full': 'hsl(var(--white-full) / <alpha-value>)',
        gray: {
          50: 'hsl(var(--gray-50) / <alpha-value>)',
          300: 'hsl(var(--gray-300) / <alpha-value>)',
          800: 'hsl(var(--gray-800) / <alpha-value>)',
          900: 'hsl(var(--gray-900) / <alpha-value>)',
        },
        bg: {
          DEFAULT: 'hsl(var(--background) / <alpha-value>)',
          container: 'hsl(var(--background-container) / <alpha-value>)',
          interactive: 'hsl(var(--background-interactive) / <alpha-value>)',
          alternative: 'hsl(var(--background-alternative) / <alpha-value>)',
          button: 'hsl(var(--background-button) / <alpha-value>)',
        },
        foreground: {
          'DEFAULT': 'hsl(var(--foreground) / <alpha-value>)',
          'secondary': 'hsl(var(--foreground-secondary) / <alpha-value>)',
          'destructive': 'hsl(var(--foreground-destructive) / <alpha-value>)',
          'link': 'hsl(var(--foreground-link) / <alpha-value>)',
          'link-hover': 'hsl(var(--foreground-link-hover) / <alpha-value>)',
          'link-standout': 'hsl(var(--foreground-link-standout) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'hsl(var(--border) / <alpha-value>)',
          destructive: 'hsl(var(--border-destructive) / <alpha-value>)',
        },
        // 'gray': {
        //   50: '#c1c1c1',
        //   300: '#7f8290',
        //   400: '#6b7280',
        //   800: '#16141a',
        //   900: '#09080a',
        // },
        // 'light-gray': '#2c2f35',
        // 'background': '#100f13',
        // 'border': 'hsl(var(--border))',
        // 'input': 'hsl(var(--input))',
        // 'ring': 'hsl(var(--ring))',
        // 'background': 'hsl(var(--background))',
        // 'foreground': 'hsl(var(--foreground))',
        // 'primary': {
        //   DEFAULT: 'hsl(var(--primary))',
        //   foreground: 'hsl(var(--primary-foreground))',
        // },
        // 'secondary': {
        //   DEFAULT: 'hsl(var(--secondary))',
        //   foreground: 'hsl(var(--secondary-foreground))',
        // },
        // 'destructive': {
        //   DEFAULT: 'hsl(var(--destructive))',
        //   foreground: 'hsl(var(--destructive-foreground))',
        // },
        // 'muted': {
        //   DEFAULT: 'hsl(var(--muted))',
        //   foreground: 'hsl(var(--muted-foreground))',
        // },
        // 'accent': {
        //   DEFAULT: 'hsl(var(--accent))',
        //   foreground: 'hsl(var(--accent-foreground))',
        // },
        // 'popover': {
        //   DEFAULT: 'hsl(var(--popover))',
        //   foreground: 'hsl(var(--popover-foreground))',
        // },
        // 'card': {
        //   DEFAULT: 'hsl(var(--card))',
        //   foreground: 'hsl(var(--card-foreground))',
        // },
      },
      borderRadius: {
      	xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'collapsible-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'collapsible-down': 'collapsible-down 0.2s ease-in-out',
        'collapsible-up': 'collapsible-up 0.2s ease-in-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    animate,
  ],
}
