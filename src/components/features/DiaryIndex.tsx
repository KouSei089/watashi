import React, { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { eyecatchData } from '../../data/eyecatchData';
import { BookItem } from '../../types';
import SectionHeader from '../common/SectionHeader';
import TickRule from '../common/TickRule';
import { useScrollTo } from '../../lib/lenis';

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

/*
  note の画像は 1280x669 で配信される。格子では 191px 幅で見せるので、
  そのまま貼ると必要な 7 倍近い画素を送ることになり、105 枚で 13.4MB になる。
  note の CDN は ?width= に対応しているので、複数の幅を srcset で渡して
  ブラウザに選ばせる（1x なら 320w=12KB、2x なら 480w=24KB）。
*/
const IMAGE_WIDTHS = [320, 480, 640];
const srcSetFor = (url: string) =>
  IMAGE_WIDTHS.map((w) => `${url}?width=${w} ${w}w`).join(', ');
/** 格子の列数に応じた表示幅。6列/4列/2列 */
const IMAGE_SIZES = '(min-width: 1024px) 17vw, (min-width: 640px) 24vw, 48vw';

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
 *
 * 105 件を上から辿るしかないのが操作性の一番の問題だったので、
 * 年を移る帯を画面上部に貼り付けている。どの位置からでも他の年へ
 * 移れるし、先頭にも戻れる。年ごとに見出しを貼り付ける作りも試したが、
 * 白い帯が年の数だけ入れ替わり立ち替わり現れてぎこちなかった。
 * 貼り付けるのは 1 本だけにして、いま見ている年をそこに示す。
 *
 * Rhythm は押しても選べる。指で触る画面にはホバーが無い。
 */
const DiaryIndex: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);
  const [currentYear, setCurrentYear] = useState<string | null>(null);
  const scrollTo = useScrollTo();
  const gridRef = useRef<HTMLDivElement>(null);

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
    const toFraction = (t: number) => (t - min) / span;

    /*
      軸の下に月と年の刻みを置く。点の粗密だけでは
      「どれくらいの間が空いたか」が読めない。
      等間隔の刻みが下にあると、点と点の隙間が
      そのまま何ヶ月ぶんかとして読める。
    */
    const gradations: number[] = [];
    const milestones: { fraction: number; label: string }[] = [];
    const start = new Date(min);
    const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
    while (cursor.getTime() <= max) {
      const f = toFraction(cursor.getTime());
      if (f >= 0 && f <= 1) {
        if (cursor.getMonth() === 0) {
          milestones.push({ fraction: f, label: String(cursor.getFullYear()) });
        } else {
          gradations.push(f);
        }
      }
      cursor.setMonth(cursor.getMonth() + 1);
    }

    // 前の記録から何日空いたか。古い順に見て差を取る
    const sortedAsc = [...days].sort((a, b) => a - b);
    const gapByTime = new Map<number, number>();
    sortedAsc.forEach((d, i) => {
      if (i > 0) gapByTime.set(d, Math.round((d - sortedAsc[i - 1]) / 86400000));
    });

    return {
      fractions: days.map(toFraction),
      gradations,
      milestones,
      gaps: days.map((d) => gapByTime.get(d) ?? null),
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

  const jumpToYear = useCallback(
    (year: string) => scrollTo(`#diary-${year}`),
    [scrollTo]
  );

  // いま画面に入っている年を帯に示す
  useEffect(() => {
    const sections = gridRef.current?.querySelectorAll('section[id^="diary-"]');
    if (!sections?.length) return;

    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((r) => r.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setCurrentYear(visible.target.id.replace('diary-', ''));
      },
      // 帯のすぐ下を判定線にする
      { rootMargin: '-72px 0px -70% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // 目盛りを押したら、その 1 件が入っている年まで送る
  const selectTick = useCallback(
    (i: number) => {
      setActive(i);
      jumpToYear(entries[i].year);
    },
    [entries, jumpToYear]
  );

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

        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 mt-16 pb-3 border-b border-ink/22">
          <div className="lg:col-span-2 marginalia">{entries.length} Entries</div>
          <div className="lg:col-span-10 flex flex-wrap gap-x-6 gap-y-1 mt-2 lg:mt-0">
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
              gradations={rhythm.gradations}
              milestones={rhythm.milestones}
              ends={[rhythm.first, rhythm.last]}
              activeIndex={active}
              onHover={setActive}
              onSelect={selectTick}
              title={`${rhythm.first} から ${rhythm.last} までの ${entries.length} 件`}
            />
            {/* いま指している 1 件。図の下に文字で出す */}
            <div className="h-5 mt-3">
              {activeEntry ? (
                <span className="marginalia !text-ink">
                  {pad((active ?? 0) + 1)} — {activeEntry.created_at} — {activeEntry.title}
                  {active !== null && rhythm.gaps[active] !== null && (
                    <span className="!text-ink/40"> ／ 前回から{rhythm.gaps[active]}日</span>
                  )}
                </span>
              ) : (
                <span className="marginalia">目盛りにふれると、その日の記録が出ます</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/*
        年を移る帯。年ごとに貼り付けるのではなく 1 本だけを貼り付け、
        いま見ている年をそこに示す。どの位置からでも他の年へ移れる。
      */}
      <div className="sticky top-14 z-30 bg-paper/85 backdrop-blur-md border-y border-ink/10">
        <div className="px-6 py-2.5 flex items-center gap-5">
          <span className="marginalia hidden sm:inline">Jump</span>
          <div className="flex items-center gap-4 flex-1 overflow-x-auto">
            {years.map(([year, count]) => (
              <button
                key={year}
                type="button"
                onClick={() => jumpToYear(year)}
                aria-current={currentYear === year ? 'true' : undefined}
                className={`marginalia bg-transparent border-0 p-0 whitespace-nowrap transition-colors ${
                  currentYear === year ? '!text-ink' : 'hover:!text-ink/70'
                }`}
              >
                {year} <span className="text-ink/30">{count}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollTo(0)}
            className="marginalia bg-transparent border-0 p-0 hover:!text-ink transition-colors whitespace-nowrap"
          >
            ↑ 先頭
          </button>
        </div>
      </div>

      {/* 年ごとに区切った索引 */}
      <div ref={gridRef} className="w-full px-6 pb-24 pt-10">
        {grouped.map(([year, items]) => (
          <section key={year} id={`diary-${year}`} className="mt-16 first:mt-0 scroll-mt-28">
            <div className="flex items-baseline gap-4 pb-3 mb-5 border-b border-ink/22">
              <span className="font-display text-[19px] sm:text-[22px] text-ink leading-none">{year}</span>
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
                  aria-label={`${entry.kind} ${entry.title}（${entry.created_at}）を note で読む`}
                  onMouseEnter={() => setActive(index)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(index)}
                  onBlur={() => setActive(null)}
                >
                  <div
                    className={`relative aspect-[1280/669] overflow-hidden transition-shadow duration-500 ${
                      active === index ? 'ring-1 ring-ink/50' : ''
                    }`}
                  >
                    <img
                      src={`${entry.eyecatch}?width=${IMAGE_WIDTHS[0]}`}
                      srcSet={srcSetFor(entry.eyecatch)}
                      sizes={IMAGE_SIZES}
                      alt={entry.name}
                      loading="lazy"
                      decoding="async"
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
                  <div className="text-[11px] text-ink/60 leading-[1.5] mt-0.5">
                    {entry.title}
                    <span className="text-[9px] align-super ml-1 opacity-0 group-hover:opacity-60 group-focus:opacity-60 transition-opacity">
                      ↗
                    </span>
                  </div>
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

