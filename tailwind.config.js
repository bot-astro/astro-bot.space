const animate = require("tailwindcss-animate")
const defaultTheme = require("tailwindcss/defaultTheme");

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
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      screens: {
        'xsm': '360px',
        "2xl": "1400px",
      },
      fontFamily: {
        display: ['Evolve', ...defaultTheme.fontFamily.sans],
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        /// PALETTE ///
        purple: {
          50: 'hsl(var(--purple-50) / <alpha-value>)',
          400: 'hsl(var(--purple-400) / <alpha-value>)',
          500: 'hsl(var(--purple-500) / <alpha-value>)',
        },
        pink: {
          500: 'hsl(var(--pink-500) / <alpha-value>)',
        },
        yellow: {
          500: 'hsl(var(--yellow-500) / <alpha-value>)',
          600: 'hsl(var(--yellow-600) / <alpha-value>)',
          800: 'hsl(var(--yellow-800) / <alpha-value>)',
        },
        orange: {
          500: 'hsl(var(--orange-500) / <alpha-value>)',
        },
        red: {
          400: 'hsl(var(--red-400) / <alpha-value>)',
          500: 'hsl(var(--red-500) / <alpha-value>)',
        },
        white: {
          500: 'hsl(var(--white-500) / <alpha-value>)',
          900: 'hsl(var(--white-900) / <alpha-value>)',
        },
        gray: {
          50: 'hsl(var(--gray-50) / <alpha-value>)',
          300: 'hsl(var(--gray-300) / <alpha-value>)',
          800: 'hsl(var(--gray-800) / <alpha-value>)',
          900: 'hsl(var(--gray-900) / <alpha-value>)',
        },
        discord: 'rgb(var(--discord) / <alpha-value>)',
        /// SHADCN & UTILS ///
        background: {
          DEFAULT: 'hsl(var(--background) / <alpha-value>)',
          container: 'hsl(var(--background-container) / <alpha-value>)',
          interactive: 'hsl(var(--background-interactive) / <alpha-value>)',
          alternative: 'hsl(var(--background-alternative) / <alpha-value>)',
          button: 'hsl(var(--background-button) / <alpha-value>)',
          ultimate: 'hsl(var(--background-ultimate) / <alpha-value>)',
        },
        foreground: {
          'DEFAULT': 'hsl(var(--foreground) / <alpha-value>)',
          'secondary': 'hsl(var(--foreground-secondary) / <alpha-value>)',
          'destructive': 'hsl(var(--foreground-destructive) / <alpha-value>)',
          'link': 'hsl(var(--foreground-link) / <alpha-value>)',
          'link-hover': 'hsl(var(--foreground-link-hover) / <alpha-value>)',
          'link-standout': 'hsl(var(--foreground-link-standout) / <alpha-value>)',
          'ultimate': 'hsl(var(--foreground-ultimate) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'hsl(var(--border) / <alpha-value>)',
          destructive: 'hsl(var(--border-destructive) / <alpha-value>)',
        },
        /// TODO: THOSE ARE NOT MODIFIED YET ///
        // input: "hsl(var(--input))",
        // ring: "hsl(var(--ring))",
        // primary: {
        //   DEFAULT: "hsl(var(--primary))",
        //   foreground: "hsl(var(--primary-foreground))",
        // },
        // secondary: {
        //   DEFAULT: "hsl(var(--secondary))",
        //   foreground: "hsl(var(--secondary-foreground))",
        // },
        // destructive: {
        //   DEFAULT: "hsl(var(--destructive))",
        //   foreground: "hsl(var(--destructive-foreground))",
        // },
        muted: {
          DEFAULT: "hsl(var(--muted))",
        //   foreground: "hsl(var(--muted-foreground))",
        },
        // accent: {
        //   DEFAULT: "hsl(var(--accent))",
        //   foreground: "hsl(var(--accent-foreground))",
        // },
        // popover: {
        //   DEFAULT: "hsl(var(--popover))",
        //   foreground: "hsl(var(--popover-foreground))",
        // },
        // card: {
        //   DEFAULT: "hsl(var(--card))",
        //   foreground: "hsl(var(--card-foreground))",
        // },
      },
      borderRadius: {
      	xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "collapsible-down": {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        "collapsible-up": {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.1s ease-out",
        "accordion-up": "accordion-up 0.1s ease-out",
        "collapsible-down": "collapsible-down 0.1s ease-in-out",
        "collapsible-up": "collapsible-up 0.1s ease-in-out",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    animate,
  ],
}