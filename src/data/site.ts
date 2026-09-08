// サイト全体で共有する定数
export const MAIN_VISUAL_URL =
  'https://github.com/KouSei089/watashi/assets/77420123/d32f15ff-a725-40a4-b58f-8c79d67f8eb6';

/**
 * 「わたし」の節で使う写真。
 *
 * 1 枚目が主題として大きく出る（PC 68vh / スマホ 52vh、object-cover）。
 * 2 枚目以降は 2 カラム。枚数が奇数なら最後の 1 枚が横幅いっぱいになる。
 * 並べ替え・差し替えはこの配列を編集するだけでよい。
 *
 * 実体は public/photos/。元データ（6000x4000, 計21MB）はビルドに含めたくないので
 * photos-original/ に退避し、ここでは Web 用に縮小したものを参照している。
 */
export const PROFILE_PHOTOS: { src: string; alt: string }[] = [
  { src: '/watashi/photos/room.jpg', alt: '海の見える窓辺の机と本棚' },
  { src: '/watashi/photos/bookshelf.jpg', alt: '本の詰まった棚' },
  { src: '/watashi/photos/bay.jpg', alt: '船の浮かぶ入江と対岸の山' },
  { src: '/watashi/photos/window-sea.jpg', alt: '窓越しに見える海と防波堤' },
  { src: '/watashi/photos/window-green.jpg', alt: '緑を映す横長の窓' },
];

export const NOTE_URL = 'https://note.com/izuha0';
export const READS_URL = 'https://reads.jp/u/izuha';
export const CONTACT_EMAIL = 'izumiharuya12@gmail.com';
