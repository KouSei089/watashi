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
  { src: '/watashi/photos/photobook.jpg', alt: '書店に平積みされた写真集。表紙に赤い傘' },
  { src: '/watashi/photos/lighttrails.jpg', alt: '流れる光の軌跡' },
  { src: '/watashi/photos/platform.jpg', alt: '傷ついたガラス越しに見えるホームの灯り' },
  { src: '/watashi/photos/playground.jpg', alt: '公園の遊具' },
  { src: '/watashi/photos/moon.jpg', alt: '月の出た夕暮れの町' },
];

export const NOTE_URL = 'https://note.com/izuha0';
export const READS_URL = 'https://reads.jp/u/izuha';
export const CONTACT_EMAIL = 'izumiharuya12@gmail.com';
