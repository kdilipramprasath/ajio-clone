module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        Oswald: ["Oswald"],
        Jost: ["Jost"],
      },
      colors: {
        primary: "#2f4254",
        "dirt-yellow": "#ada785",
        "ajio-yellow": "#d5a249"
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
    },
  },
  plugins: [],
};
