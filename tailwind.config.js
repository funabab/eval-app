/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{tsx,jsx}", "./src/**/*.{tsx,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        "poppins-light300": ["Poppins_300Light"],
        "poppins-regular400": ["Poppins_400Regular"],
        "poppins-regularItalic400": ["Poppins_400Regular_Italic"],
        "poppins-semibold600": ["Poppins_600SemiBold"],
        "poppins-medium500": ["Poppins_500Medium"],
        "poppins-semiboldItalic600": ["Poppins_600SemiBold_Italic"],
      },
    },
  },
  plugins: [],
};
