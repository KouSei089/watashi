/**
 * ページごとの背景の色。
 *
 * 4 色を大きくぼかして重ね、ゆっくり漂わせる。
 * 紙面が #F6F6F4 で文字が濃色なので、どれも明度は高く保つ。
 * 濃い色を置くと本文が負ける。
 *
 * 並び順は blobLayout の 4 枚に対応する。前の 2 つが大きい面なので、
 * ここに章のメイン色を置き、後ろの 2 つに別の色相を差す。
 * 同じ色相を 4 枚重ねると単調になり、表紙だけが豊かに見えていた。
 */
export type Palette = readonly [string, string, string, string];

export const palettes: Record<string, Palette> = {
  // 表紙。写真から取った色（海・対岸の山・室内の木・影）
  index: ['#8CB4C1', '#B4C9A8', '#E2C9A0', '#ADA7C6'],
  // わたし。灰を主に、淡い青と薔薇色を差す
  about: ['#B3B4B0', '#C7C4BC', '#B4C4CC', '#CCBFC6'],
  // これまでのわたし。青を主に、若草と砂色を差す
  history: ['#8CA8CA', '#A3BFD2', '#B6C8AE', '#D5C6AC'],
  // 読書の日記。黄を主に、赤みと淡い橄欖を差す
  diary: ['#E3C888', '#EEDCA9', '#DBB9A2', '#BEC9AC'],
  // おといあわせ。緑を主に、青緑と砂色を差す
  contact: ['#A4BE9A', '#BCD0B0', '#A2BEC6', '#D8CBAC'],
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
