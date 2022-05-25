module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        'sliderImage': '50rem',
      },
      backgroundImage: {
        'slider1': "url('src/asset/image/background/bg1.jpeg')",
        'slider2': "url('src/asset/image/background/bg2.jpeg')",
        'slider3': "url('src/asset/image/background/bg3.jpeg')",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
