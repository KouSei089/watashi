import React, { useMemo, useState } from 'react';
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

const pad = (n: number) => String(n).padStart(3, '0');

/**
 * 読書の日記。
 *
 * 105 件を一望できるようにしている。並んでいること自体が
 * 2 年半ぶんの記録の厚みになる。
 *
 * ただ敷き詰めるだけでは並んでいるようにしか見えないので、
 * 年ごとに区切り、日付と通し番号を常に添えて索引にしている。
 * ホバーでしか出さないと、指で触る画面では永久に読めない。
 *
 * 上の Rhythm は 105 件を書いた日そのものの位置に打った目盛りで、
 * カードと相互に連動する。カードに触れるとその 1 本が伸び、
 * 目盛りに触れるとそのカードが浮かぶ。図と実データが
 * 別物に見えないようにするため。
 */
const DiaryIndex: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);

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
    書いた日そのものの位置。並び順は entries と揃えてある。
    ここで日付順に並べ替えるとカードとの対応が崩れる。
  */
  const rhythm = useMemo(() => {
    const days = entries.map((e) => new Date(e.created_at.replace(/\./g, '-')).getTime());
    const min = Math.min(...days);
    const max = Math.max(...days);
    const span = max - min || 1;
    return {
      fractions: days.map((d) => (d - min) / span),
      dividers: Array.from(new Set(entries.map((e) => e.year)))
        .map((y) => (new Date(`${y}-01-01`).getTime() - min) / span)
        .filter((f) => f >= 0 && f <= 1),
      first: entries[entries.length - 1].created_at,
      last: entries[0].created_at,
    };
  }, [entries]);

  // 年ごとにまとめる。新しい年が上。通し番号は全体での位置を保つ
  const grouped = useMemo(() => {
    const map = new Map<string, { entry: Entry; index: number }[]>();
    entries.forEach((entry, index) => {
      map.set(entry.year, [...(map.get(entry.year) ?? []), { entry, index }]);
    });
    return Array.from(map.entries());
  }, [entries]);

  const activeEntry = active === null ? null : entries[active];

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

        {/* 書いた日そのものの位置に打った目盛り。カードと相互に連動する */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 mt-10">
          <div className="lg:col-span-2 marginalia mb-4 lg:mb-0">Rhythm</div>
          <div className="lg:col-span-10">
            <TickRule
              fractions={rhythm.fractions}
              dividers={rhythm.dividers}
              ends={[rhythm.first, rhythm.last]}
              activeIndex={active}
              onHover={setActive}
              title={`${rhythm.first} から ${rhythm.last} までの ${entries.length} 件`}
            />
            {/* いま指している 1 件。図の下に文字で出す */}
            <div className="h-5 mt-2">
              {activeEntry && (
                <span className="marginalia !text-ink">
                  {pad((active ?? 0) + 1)} — {activeEntry.created_at} — {activeEntry.title}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 年ごとに区切った索引 */}
      <div className="w-full px-6 pb-24">
        {grouped.map(([year, items]) => (
          <section key={year} className="mt-14 first:mt-0">
            <div className="flex items-baseline gap-4 pb-3 mb-5 border-b border-ink/15">
              <span className="marginalia !text-ink">{year}</span>
              <span className="marginalia">{items.length} entries</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-6">
              {items.map(({ entry, index }) => (
                <a
                  key={entry.noteUrl}
                  href={entry.noteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="diary-cell group block no-underline"
                  onMouseEnter={() => setActive(index)}
                  onMouseLeave={() => setActive(null)}
                >
                  <div
                    className={`relative aspect-[1280/669] overflow-hidden transition-shadow duration-500 ${
                      active === index ? 'ring-1 ring-ink/50' : ''
                    }`}
                  >
                    <img
                      src={entry.eyecatch}
                      alt={entry.name}
                      loading="lazy"
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform ${
                        active === index ? 'scale-105' : ''
                      }`}
                    />
                  </div>

                  {/* 日付と通し番号は常に出す。触る画面ではホバーが無い */}
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="marginalia !text-ink/30 tabular-nums">{pad(index + 1)}</span>
                    <span
                      className={`marginalia transition-colors duration-300 ${
                        active === index ? '!text-ink' : ''
                      }`}
                    >
                      {entry.created_at}
                    </span>
                  </div>
                  <div className="text-[11px] text-ink/60 leading-[1.5] mt-0.5">{entry.title}</div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
};

export default DiaryIndex;

