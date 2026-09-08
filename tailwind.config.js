module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 本文・ラベル。欧文はグロテスク、和文はゴシック。
        // Inter に和文グリフは無いので、日本語は自動的に Zen Kaku Gothic New に落ちる。
        // 数字・ラベル・年号が締まり、和文は素直なゴシックのまま読める。
        jp: ['Inter', 'Zen Kaku Gothic New', 'sans-serif'],
        // 見出し・名前・章名。明朝にして写真集の紙面に寄せる。
        // 小さな字では読みにくいので、本文やラベルには使わない。
        display: ['Zen Old Mincho', 'Inter', 'serif'],
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
