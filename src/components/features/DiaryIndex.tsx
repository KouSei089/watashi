import React, { useMemo } from 'react';
import { eyecatchData } from '../../data/eyecatchData';
import { BookItem } from '../../types';
import SectionHeader from '../common/SectionHeader';
import TickRule from '../common/TickRule';

interface Entry extends BookItem {
  /** 見出し。「読書日記 ｜ 6/2〜6/8」なら「6/2〜6/8」 */
  title: string;
  kind: string;
  year: string;
}

/**
 * 105 件のうち 100 件が「読書日記 ｜ 日付」という同じ形をしている。
 * 見出しに毎回「読書日記 ｜」が並ぶのは冗長なので種別として括り出す。
 */
const parseEntry = (item: BookItem): Entry => {
  const matched = item.name.match(/^読書日記\s*｜\s*(.+)$/);
  return {
    ...item,
    title: matched ? matched[1] : item.name,
    kind: matched ? '読書日記' : 'ノート',
    year: item.created_at.slice(0, 4),
  };
};

/**
 * 読書の日記。
 *
 * 1 件ずつ大きく見せる形も試したが、全体が見えず量が伝わらなかった。
 * 105 件を一望できる格子に戻している。並んでいること自体が、
 * 2 年半ぶんの記録の厚みになる。
 *
 * 隙間なく敷き詰めると密すぎて、背景の色も見えなくなる。
 * 写真のあいだを空けて、そこから背景が覗くようにしている。
 * 罫線の格子はやめた。線で仕切ると背景と切り離されてしまう。
 */
const DiaryIndex: React.FC = () => {
  const entries = useMemo(
    () =>
      [...eyecatchData]
        .sort((a, b) => b.created_at.localeCompare(a.created_at))
        .map(parseEntry),
    []
  );

  const years = useMemo(() => {
    const counts = new Map<string, number>();
    entries.forEach((e) => counts.set(e.year, (counts.get(e.year) ?? 0) + 1));
    return Array.from(counts.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [entries]);

  /*
    105 件を書いた日付そのものの位置に打つ。
    書き続けた時期と空いた時期がそのまま粗密として出る。
    表紙が年表に対してやっているのと同じことを、日記に対してやっている。
  */
  const rhythm = useMemo(() => {
    const days = entries.map((e) => new Date(e.created_at.replace(/\./g, '-')).getTime());
    const min = Math.min(...days);
    const max = Math.max(...days);
    const span = max - min || 1;
    return {
      fractions: days.map((d) => (d - min) / span).sort((a, b) => a - b),
      // 年の境目
      dividers: Array.from(new Set(entries.map((e) => e.year)))
        .map((y) => (new Date(`${y}-01-01`).getTime() - min) / span)
        .filter((f) => f >= 0 && f <= 1),
      first: entries[entries.length - 1].created_at,
      last: entries[0].created_at,
    };
  }, [entries]);


  return (
    <section className="w-full font-jp">
      <div className="px-6 pt-24 pb-12">
        <SectionHeader
          id="book-diary"
          index="03"
          label="Diary"
          note={
            <>
              <p className="m-0 mb-1">日々の読書を記録しています。</p>
              <p className="m-0">ここに並ぶのは、わたしの思考や感性をかたちづくってきた本たちの記録です。</p>
            </>
          }
        >
          読書の日記
        </SectionHeader>

        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 mt-16 pb-3 border-b border-ink/15">
          <div className="lg:col-span-2 marginalia">{entries.length} Entries</div>
          <div className="lg:col-span-10 flex flex-wrap gap-x-8 gap-y-1 mt-2 lg:mt-0">
            {years.map(([year, count]) => (
              <span key={year} className="marginalia">
                {year} <span className="text-ink/30">{count}</span>
              </span>
            ))}
          </div>
        </div>

        {/* 書いた日そのものの位置に打った目盛り。書く手の速さが粗密になる */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 mt-10">
          <div className="lg:col-span-2 marginalia mb-4 lg:mb-0">Rhythm</div>
          <div className="lg:col-span-10">
            <TickRule
              fractions={rhythm.fractions}
              dividers={rhythm.dividers}
              ends={[rhythm.first, rhythm.last]}
              title={`${rhythm.first} から ${rhythm.last} までの ${entries.length} 件`}
            />
          </div>
        </div>
      </div>

      <div className="w-full px-6 pb-24">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {entries.map((entry) => (
            <a
              key={entry.noteUrl}
              href={entry.noteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="diary-cell group relative block aspect-[1280/669] overflow-hidden"
              title={`${entry.kind}｜${entry.title}（${entry.created_at}）`}
            >
              <img
                src={entry.eyecatch}
                alt={entry.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out sm:group-hover:scale-105 will-change-transform"
              />
              <div className="absolute inset-0 bg-ink/75 flex flex-col justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[9px] text-white/50 mb-0.5 tabular-nums">{entry.created_at}</span>
                <span className="text-[10px] text-white leading-tight">{entry.title}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiaryIndex;
