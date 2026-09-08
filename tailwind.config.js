module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 欧文はグロテスク、和文はゴシック。
        // Inter に和文グリフは無いので、日本語は自動的に Zen Kaku Gothic New に落ちる。
        // 数字・ラベル・年号が締まり、和文は素直なゴシックのまま読める。
        jp: ['Inter', 'Zen Kaku Gothic New', 'sans-serif'],
      },
      colors: {
        // 純白ではなく、わずかに温かいオフホワイト
        'paper': '#F6F6F4',
        'ink': '#111111',
        'matte': '#111111',
      },
    },
  },
  plugins: [],
}
