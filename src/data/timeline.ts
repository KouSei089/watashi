export interface TimelineItem {
  title: string;
  date: string;
}

export const timeline: TimelineItem[] = [
  { title: 'GU/ジーユー 入社', date: '2016' },
  { title: '本を読みはじめる', date: '2016' },
  { title: '環境問題に興味を持ちはじめる', date: '2019' },
  { title: 'RUNTEQでのWeb開発学習', date: '2021' },
  { title: 'GU/ジーユー 退職', date: '2021' },
  { title: 'Mikke 開発・リリース', date: '2022' },
  { title: 'チームラボ/teamLab エンジニアとして入社', date: '2022' },
  { title: '不動産業界 保守開発 BEエンジニア', date: '2022' },
  { title: '不動産業界 新規開発 BEエンジニア', date: '2023-2024' },
  { title: 'ECサイト 認証基盤 開発責任者', date: '2024' },
  { title: 'チームラボ/teamLab カタリストチームへ移籍', date: '2024' },
  { title: '飲食デリバリーサイト プロジェクトマネージャ', date: '2024-2025' },
  { title: 'チームラボ/teamLab 退職', date: '2025' },
  { title: 'watashi 制作', date: '2025' },
  { title: '島根県隠岐諸島海士町へ移住', date: '2025' },
  { title: '株式会社海士 入社', date: '2025' },
];

export const startYear = (date: string) => parseInt(date.slice(0, 4), 10);

export const FIRST_YEAR = startYear(timeline[0].date);
export const LAST_YEAR = startYear(timeline[timeline.length - 1].date);

/**
 * 各項目を「実際の時間軸上のどこか」として 0..1 で返す。
 *
 * 同じ年に複数あるものは、その年の幅の中で均等に散らす。
 * まとめて同じ位置に置くと重なって 1 本に見えてしまい、
 * できごとが集中した年の密度が読み取れなくなる。
 */
export const timelineFractions = (): number[] => {
  const span = LAST_YEAR - FIRST_YEAR + 1;
  const countByYear = new Map<number, number>();
  timeline.forEach((item) => {
    const y = startYear(item.date);
    countByYear.set(y, (countByYear.get(y) ?? 0) + 1);
  });

  const seen = new Map<number, number>();
  return timeline.map((item) => {
    const y = startYear(item.date);
    const nth = (seen.get(y) ?? 0) + 1;
    seen.set(y, nth);
    const within = nth / ((countByYear.get(y) ?? 1) + 1);
    return (y - FIRST_YEAR + within) / span;
  });
};
