import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Reveal, { revealItem } from '../common/Reveal';
import SectionHeader from '../common/SectionHeader';
import { timeline, startYear, FIRST_YEAR, LAST_YEAR } from '../../data/timeline';

/** できごとの無い年の行の高さ。ここが「空いた時間」の長さになる */
const EMPTY_YEAR_H = 58;

/** 軸の上の丸の直径。その年のできごとの数だけ大きくなる */
const dotSize = (count: number) => 9 + count * 3;

/**
 * これまでのわたし。
 *
 * 軸に 2016 から 2025 までの全ての年を刻む。できごとの無い年も
 * 行として置くので、空白そのものが年数として数えられる。
 * 以前は空いた年数を「2年」と文字で注記していたが、
 * 目盛りが数えられるなら注記は要らない。
 *
 * 軸の上の丸は、その年のできごとの数だけ大きくなる（1 件で 12px、
 * 4 件で 21px）。ただの飾りではなく、年ごとの密度を示す。
 * 中は塗らない。動く背景の上では不透明な円が浮いて見えるうえ、
 * 軸が輪を貫くことで「線に通した粒」として読める。
 *
 * 同じ年に複数あるとき、行を並べただけでは地の文に見えてしまう。
 * 1 件ずつ軸から短い枝を引き、あいだに罫線を入れて、
 * それぞれが独立した記載だと分かるようにしている。
 *
 * 軸と点の基準を揃えるため、余白は ol ではなく li に持たせている。
 * ol に padding を置くと、ol 基準の軸線と li 基準の点とで
 * padding のぶんだけ横位置がずれる。
 */
const Timeline: React.FC = () => {
  const rows = useMemo(() => {
    const byYear = new Map<number, string[]>();
    timeline.forEach((item) => {
      const y = startYear(item.date);
      byYear.set(y, [...(byYear.get(y) ?? []), item.title]);
    });

    const all: { year: number; titles: string[] }[] = [];
    for (let y = FIRST_YEAR; y <= LAST_YEAR; y += 1) {
      all.push({ year: y, titles: byYear.get(y) ?? [] });
    }
    return all;
  }, []);

  return (
    <section className="w-full font-jp px-6 pt-24 pb-24">
      <Reveal>
        <motion.div variants={revealItem}>
          <SectionHeader
            id="history"
            index="02"
            label="History"
            note={`${FIRST_YEAR}年から${LAST_YEAR}年まで、${timeline.length}のできごと。できごとの無い年も目盛りとして刻んでいます。`}
          >
            これまでのわたし
          </SectionHeader>
        </motion.div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 mt-20">
        <div className="lg:col-span-2 marginalia mb-6 lg:mb-0">
          {FIRST_YEAR}—{LAST_YEAR}
        </div>

        <ol className="lg:col-span-10 relative list-none m-0 p-0">
          {/* 全体を貫く時間軸。年の目盛りと点はすべてこの線の上に乗る */}
          <span className="absolute left-12 top-2 bottom-2 w-px bg-ink/20" aria-hidden="true" />

          {rows.map(({ year, titles }) => {
            const hasEvents = titles.length > 0;
            return (
              <li
                key={year}
                className="relative pl-20 sm:pl-24"
                style={{ minHeight: hasEvents ? undefined : EMPTY_YEAR_H, paddingTop: hasEvents ? 28 : 0 }}
              >
                {/* 年。軸の左側に、右揃えで柱のように並べる */}
                <span
                  className={`marginalia absolute left-0 w-10 text-right tabular-nums leading-none ${
                    hasEvents ? '!text-ink' : '!text-ink/25'
                  }`}
                  style={{ top: hasEvents ? 28 : 0 }}
                >
                  {year}
                </span>

                {/* 軸の上の印。できごとのある年は点、無い年は短い横棒 */}
                {hasEvents ? (
                  <span
                    className="absolute left-12 -translate-x-1/2 rounded-full border border-ink/55 flex items-center justify-center"
                    style={{
                      width: dotSize(titles.length),
                      height: dotSize(titles.length),
                      top: 28 - dotSize(titles.length) / 2 + 3,
                    }}
                    aria-hidden="true"
                  >
                    <span className="w-[3px] h-[3px] rounded-full bg-ink/70" />
                  </span>
                ) : (
                  <span
                    className="absolute left-12 w-2 h-px -translate-x-1/2 bg-ink/25"
                    style={{ top: 3 }}
                    aria-hidden="true"
                  />
                )}

                {hasEvents && (
                  <Reveal>
                    <motion.ul className="list-none m-0 p-0 pb-8" variants={revealItem}>
                      {titles.map((title, i) => (
                        <li
                          key={title}
                          className={`relative py-2.5 ${i > 0 ? 'border-t border-ink/10' : ''}`}
                        >
                          {/* 軸から伸びる枝。1 件ずつが軸に繋がって見える */}
                          <span
                            className="absolute -left-6 sm:-left-7 top-[1.15em] w-4 sm:w-5 h-px bg-ink/25"
                            aria-hidden="true"
                          />
                          <span className="font-display text-[16px] sm:text-[19px] text-ink leading-[1.5] tracking-[0.03em]">
                            {title}
                          </span>
                        </li>
                      ))}
                    </motion.ul>
                  </Reveal>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Timeline;
