const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        display: ["Evolve", ...defaultTheme.fontFamily.sans],
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
