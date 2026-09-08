import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Reveal, { revealItem } from '../common/Reveal';
import SectionHeader from '../common/SectionHeader';
import { timeline, startYear, FIRST_YEAR, LAST_YEAR } from '../../data/timeline';

/** 年がひとつ空くごとに足される余白（px） */
const YEAR_GAP = 56;
const BASE_GAP = 40;

/**
 * これまでのわたし。
 *
 * 以前は GSAP の pin による横スクロールだったが、ページを章ごとに
 * 分けたことで「スクロールで見せる」必然性が無くなり、
 * 静かな紙面からも浮いていた。縦に読ませる年表にしている。
 *
 * 年ごとのまとまりの上の余白を、前の年からの隔たりに比例させている。
 * 2016 から 2019 は間延びし、できごとの重なった 2025 は詰まる。
 * 表紙の目盛りが示す粗密と、そのまま同じものを縦で見せている。
 */
const Timeline: React.FC = () => {
  const years = useMemo(() => {
    const map = new Map<number, string[]>();
    timeline.forEach((item) => {
      const y = startYear(item.date);
      map.set(y, [...(map.get(y) ?? []), item.title]);
    });

    const entries = Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
    return entries.map(([year, titles], i) => ({
      year,
      titles,
      // 前の年からの隔たりぶん、上に余白を積む
      gap: i === 0 ? 0 : BASE_GAP + (year - entries[i - 1][0] - 1) * YEAR_GAP,
    }));
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

      <ol className="list-none m-0 p-0 mt-16">
        {years.map(({ year, titles, gap }) => (
          <li key={year} style={{ marginTop: gap }}>
            <Reveal>
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 border-t border-ink/15 pt-4"
                variants={revealItem}
              >
                <div className="lg:col-span-2 mb-3 lg:mb-0">
                  <span className="marginalia !text-ink">{year}</span>
                </div>

                <ul className="lg:col-span-10 list-none m-0 p-0">
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
    </section>
  );
};

export default Timeline;
