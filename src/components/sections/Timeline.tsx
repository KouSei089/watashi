import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Reveal, { revealItem } from '../common/Reveal';
import SectionHeader from '../common/SectionHeader';
import { timeline, startYear, FIRST_YEAR, LAST_YEAR } from '../../data/timeline';

/** 年がひとつ空くごとに足される余白（px） */
const YEAR_GAP = 64;
const BASE_GAP = 44;

/**
 * これまでのわたし。
 *
 * 縦に一本の時間軸を通し、できごとを軸上の点として打つ。
 * 年ごとのまとまりの上の余白は、前の年からの隔たりに比例させている。
 * 2016 から 2019 は間延びし、できごとの重なった 2025 は詰まる。
 * 空いた年数はその余白に書き添えてあるので、間延びが
 * 単なる余白ではなく「空いた時間」だと読める。
 *
 * 軸と点の基準を揃えるため、余白は ol ではなく li に持たせている。
 * ol に padding を置くと、ol 基準の軸線と li 基準の点とで
 * padding のぶんだけ横位置がずれる。
 */
const Timeline: React.FC = () => {
  const years = useMemo(() => {
    const map = new Map<number, string[]>();
    timeline.forEach((item) => {
      const y = startYear(item.date);
      map.set(y, [...(map.get(y) ?? []), item.title]);
    });

    const entries = Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
    return entries.map(([year, titles], i) => {
      const skipped = i === 0 ? 0 : year - entries[i - 1][0] - 1;
      return {
        year,
        titles,
        skipped,
        gap: i === 0 ? 0 : BASE_GAP + skipped * YEAR_GAP,
      };
    });
  }, []);

  return (
    <section className="w-full font-jp px-6 pt-24 pb-24">
      <Reveal>
        <motion.div variants={revealItem}>
          <SectionHeader
            id="history"
            index="02"
            label="History"
            note={`${FIRST_YEAR}年から${LAST_YEAR}年まで、${timeline.length}のできごと。年のあいだの余白は、実際に空いた時間の長さです。`}
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
          {/* 全体を貫く時間軸。li の左端と同じ位置に立てる */}
          <span className="absolute left-0 top-1.5 bottom-1.5 w-px bg-ink/20" aria-hidden="true" />

          {years.map(({ year, titles, skipped, gap }) => (
            <li key={year} className="relative pl-8 sm:pl-12" style={{ marginTop: gap }}>
              {/*
                空いた年数を、その余白のまんなかに書く。
                下地は敷かない。動く背景の上では不透明な四角が浮いて見える。
                軸の上に重ねず、右隣に置くことで線と文字がぶつからない。
              */}
              {skipped > 0 && (
                <span
                  className="marginalia absolute left-0 ml-3 -translate-y-1/2 whitespace-nowrap"
                  style={{ top: -gap / 2 }}
                >
                  {skipped}年
                </span>
              )}

              {/* 軸の上の点。左端＝軸の位置にちょうど重ねる */}
              <span
                className="absolute left-0 top-1.5 w-[7px] h-[7px] -translate-x-1/2 rounded-full border border-ink/50 bg-paper"
                aria-hidden="true"
              />

              <Reveal>
                <motion.div variants={revealItem}>
                  <div className="marginalia !text-ink mb-2 leading-none">{year}</div>
                  <ul className="list-none m-0 p-0">
                    {titles.map((title) => (
                      <li
                        key={title}
                        className="font-display text-[16px] sm:text-[19px] text-ink leading-[1.65] tracking-[0.03em]"
                      >
                        {title}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Timeline;
