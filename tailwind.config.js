/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{tsx,jsx}", "./src/**/*.{tsx,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        "poppins-regular400": ["Poppins_400Regular"],
        "poppins-semibold600": ["Poppins_600SemiBold"],
        "poppins-semiboldItalic600": ["Poppins_600SemiBold_Italic"],
      },
    },
  },
  plugins: [],
};
