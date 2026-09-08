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
 * 表紙の目盛りが横で示している粗密を、ここでは縦で見せている。
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

        {/* 縦に通る時間軸。左の細い線が全体を貫く */}
        <ol className="lg:col-span-10 relative list-none m-0 p-0 pl-8 sm:pl-12">
          <span className="absolute left-0 top-1 bottom-1 w-px bg-ink/20" aria-hidden="true" />

          {years.map(({ year, titles, skipped, gap }) => (
            <li key={year} className="relative" style={{ marginTop: gap }}>
              {/* 空いた年数を余白そのものに書く */}
              {skipped > 0 && (
                <span
                  className="marginalia absolute left-0 -translate-x-1/2 -translate-y-1/2 bg-paper px-1 whitespace-nowrap"
                  style={{ top: -gap / 2 }}
                >
                  {skipped}年
                </span>
              )}

              {/* 軸の上の点 */}
              <span
                className="absolute left-0 top-[7px] w-[7px] h-[7px] -translate-x-1/2 rounded-full bg-paper border border-ink/60"
                aria-hidden="true"
              />

              <Reveal>
                <motion.div variants={revealItem}>
                  <div className="marginalia !text-ink mb-2">{year}</div>
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
