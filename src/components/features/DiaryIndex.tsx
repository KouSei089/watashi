import React, { useMemo, useState } from 'react';
import { eyecatchData } from '../../data/eyecatchData';
import { BookItem } from '../../types';
import SectionHeader from '../common/SectionHeader';

type ViewMode = 'txt' | 'img';

interface Entry extends BookItem {
  /** 索引に出す見出し。「読書日記 ｜ 6/2〜6/8」なら「6/2〜6/8」 */
  title: string;
  /** 種別。読書日記か、それ以外のノートか */
  kind: string;
  year: string;
}

/**
 * 105 件のうち 100 件が「読書日記 ｜ 日付」という同じ形をしている。
 * 見出しに毎回「読書日記 ｜」が並ぶのは索引として冗長なので、
 * 種別として括り出し、見出しには日付だけを残す。
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

const DiaryIndex: React.FC = () => {
  const [mode, setMode] = useState<ViewMode>('txt');

  const entries = useMemo(
    () =>
      [...eyecatchData]
        .sort((a, b) => b.created_at.localeCompare(a.created_at))
        .map(parseEntry),
    []
  );

  // 年ごとにまとめる。新しい年が上。
  const byYear = useMemo(() => {
    const map = new Map<string, Entry[]>();
    entries.forEach((entry) => {
      const list = map.get(entry.year) ?? [];
      list.push(entry);
      map.set(entry.year, list);
    });
    return Array.from(map.entries());
  }, [entries]);

  return (
    <section className="w-full bg-paper font-jp overflow-hidden">
      <div className="px-6 md:px-12 pt-24 pb-10">
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

        {/* 件数と、テキストか画像かの切替 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 mt-12 pb-3 border-b border-ink/15">
          <div className="lg:col-span-2 marginalia">{entries.length} Entries</div>
          <div className="lg:col-span-10 flex items-center gap-1.5 mt-2 lg:mt-0">
            {(['txt', 'img'] as ViewMode[]).map((value, i) => (
              <React.Fragment key={value}>
                {i > 0 && <span className="marginalia">·</span>}
                <button
                  type="button"
                  onClick={() => setMode(value)}
                  aria-pressed={mode === value}
                  className={`marginalia bg-transparent border-0 p-0 transition-colors duration-300 ${
                    mode === value ? '!text-ink underline underline-offset-4' : 'hover:!text-ink/70'
                  }`}
                >
                  {value === 'txt' ? 'Txt' : 'Img'}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {mode === 'txt' ? (
        <div className="px-6 md:px-12 pb-8">
          {byYear.map(([year, items]) => (
            <div key={year} className="mb-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 items-baseline mb-7">
                <div className="lg:col-span-2 marginalia">{year}</div>
                <div className="lg:col-span-10 marginalia">{items.length} entries</div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10">
                <div className="lg:col-span-2" />
                <ul className="lg:col-span-10 list-none m-0 p-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
                  {items.map((entry) => (
                    <li key={entry.noteUrl}>
                      <a
                        href={entry.noteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rule-underline text-[13px] text-ink leading-[1.6] block"
                      >
                        {entry.title}
                      </a>
                      <div className="marginalia mt-2">{entry.kind}</div>
                      <div className="marginalia">{entry.created_at}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /*
          描画の間引きは .diary-cell（index.css）に寄せている。
          列ごとのパララックスは、格子の罫線が崩れるうえに
          時系列の並び（行方向）が読めなくなるため採らなかった。
        */
        <div className="w-full grid grid-cols-5 md:grid-cols-10 gap-0 border-t border-ink/10 border-l">
          {entries.map((entry) => (
            <a
              key={entry.noteUrl}
              href={entry.noteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="diary-cell group relative aspect-[4/3] overflow-hidden bg-paper border-r border-b border-ink/10 block"
            >
              <img
                src={entry.eyecatch}
                alt={entry.name}
                className="w-full h-full object-cover transition-all duration-700 ease-out opacity-90 sm:group-hover:opacity-100 sm:group-hover:scale-105 will-change-transform"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-ink/70 flex flex-col justify-end p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[6px] text-white/50 mb-0.5">{entry.created_at}</span>
                <span className="text-[7px] text-white truncate leading-tight">{entry.title}</span>
              </div>
            </a>
          ))}
        </div>
      )}

      <div className="w-full py-28 flex flex-col items-center justify-center">
        <div className="w-px h-10 bg-ink/10 mb-6" />
        <span className="marginalia">Fin.</span>
      </div>
    </section>
  );
};

export default DiaryIndex;
