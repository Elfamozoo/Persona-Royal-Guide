module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'p5-red': '#D00000',
        'p5-black': '#000000',
        'p5-white': '#FFFFFF',
        'p5-gray': '#333333',
      },
      skew: {
        'p5': '-2deg',
      }
    },
  },
  plugins: [],
}
