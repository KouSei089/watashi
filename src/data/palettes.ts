/**
 * ページごとの背景の色。
 *
 * 4 色を大きくぼかして重ね、ゆっくり漂わせる。
 * 紙面が #F6F6F4 で文字が濃色なので、どれも明度は高く保つ。
 * 濃い色を置くと本文が負ける。
 */
export type Palette = readonly [string, string, string, string];

export const palettes: Record<string, Palette> = {
  // 表紙。写真から取った色（海・対岸の山・室内の木・影）
  index: ['#8CB4C1', '#B4C9A8', '#E2C9A0', '#ADA7C6'],
  // わたし。灰
  about: ['#B3B4B0', '#C9C7C1', '#9EA09B', '#D4D1CA'],
  // これまでのわたし。青
  history: ['#8CA8CA', '#A9BFD6', '#7789AE', '#C4D0E1'],
  // 読書の日記。黄
  diary: ['#E3C888', '#EFDDAE', '#D3B466', '#F1E7CA'],
  // おといあわせ。緑
  contact: ['#A4BE9A', '#BFD1B2', '#8AA67F', '#CEDCC3'],
};

/**
 * 色の置き方。どのページでも同じ配置を使い、色だけを差し替える。
 * サイト全体で同じ「光の当たり方」に見せるため。
 */
export const blobLayout = [
  { size: '56vw', top: '-14%', left: '-10%', duration: '34s', delay: '0s' },
  { size: '50vw', top: '2%', left: '36%', duration: '41s', delay: '-6s' },
  { size: '48vw', top: '26%', left: '60%', duration: '37s', delay: '-14s' },
  { size: '42vw', top: '36%', left: '8%', duration: '46s', delay: '-22s' },
] as const;
