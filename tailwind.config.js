module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Noto Serif JP', 'serif'],
        ale: ['Alegreya Sans SC', 'sans-serif'],
        zen: ['Zen Kurenaido', 'sans-serif']
      },
      colors: {
        'natural': '#f7f3ec',
        'light-gray': '#BBBFCA',
        'sky-gray': '#495464',
        'matte': '#36312c',
      },
      height: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '400px',
        xxl: '700px'
      }
    },
  },
  plugins: [
    require("daisyui"),
  ],
}
