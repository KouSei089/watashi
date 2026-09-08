// サイト全体で共有する定数
export const MAIN_VISUAL_URL =
  'https://github.com/KouSei089/watashi/assets/77420123/d32f15ff-a725-40a4-b58f-8c79d67f8eb6';

/**
 * 「わたし」の節で使う写真。
 *
 * 冒頭には写真を置かず、この節の中に横一列で小さく並べる。
 * 枚数は何枚でもよく、列数だけ変わる。並べ替え・差し替えは
 * この配列を編集するだけでよい。
 *
 * 実体は public/photos/。元データ（6000x4000, 計21MB）はビルドに含めたくないので
 * photos-original/ に退避し、ここでは Web 用に縮小したものを参照している。
 */
export const PROFILE_PHOTOS: { src: string; alt: string }[] = [
  { src: '/watashi/photos/room.jpg', alt: '海の見える窓辺の机と本棚' },
  { src: '/watashi/photos/bookshelf.jpg', alt: '本の詰まった棚' },
  { src: '/watashi/photos/bay.jpg', alt: '船の浮かぶ入江と対岸の山' },
];

export const NOTE_URL = 'https://note.com/izuha0';
export const READS_URL = 'https://reads.jp/u/izuha';
export const CONTACT_EMAIL = 'izumiharuya12@gmail.com';
