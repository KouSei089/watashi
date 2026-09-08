// サイト全体で共有する定数
export const MAIN_VISUAL_URL =
  'https://github.com/KouSei089/watashi/assets/77420123/d32f15ff-a725-40a4-b58f-8c79d67f8eb6';

/**
 * 「わたし」の節で使う写真。
 * いまは既存の1枚だけ。差し替え・追加はこの配列を編集するだけで、
 * どの案のレイアウトにもそのまま反映される。
 * ローカルの画像を使う場合は public/ に置いて '/watashi/xxx.jpg' の形で書く。
 */
export const PROFILE_PHOTOS: { src: string; alt: string }[] = [
  { src: MAIN_VISUAL_URL, alt: '' },
];

export const NOTE_URL = 'https://note.com/izuha0';
export const READS_URL = 'https://reads.jp/u/izuha';
export const CONTACT_EMAIL = 'izumiharuya12@gmail.com';
