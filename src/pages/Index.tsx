import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../data/profile';
import { timeline, timelineFractions, FIRST_YEAR, LAST_YEAR } from '../data/timeline';
import { sections } from '../data/sections';
import { eyecatchData } from '../data/eyecatchData';
import PageBackground from '../components/common/PageBackground';
import { palettes } from '../data/palettes';

const VIEW_W = 1000;
const VIEW_H = 44;
const PAD_X = 2;
const BASELINE_Y = 34;
const TICK_TOP = 8;

/**
 * 表紙。
 *
 * 名前とテーマ、16 のできごとを実際の年の位置に打った目盛り、
 * そして各章への目次。
 *
 * 目盛りは装飾ではなく図そのものが情報になっている。
 * 2016 から 2019 は間が空き、2025 は 4 本が寄る。この粗密は
 *「これまでのわたし」の横スクロールの粗密とそのまま一致する。
 */
const Index: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const fractions = React.useMemo(() => timelineFractions(), []);
  const usableW = VIEW_W - PAD_X * 2;

  // 最新の日記。表紙の右端に立てる
  const latest = React.useMemo(
    () => [...eyecatchData].sort((a, b) => b.created_at.localeCompare(a.created_at))[0],
    []
  );

  const yearLines = React.useMemo(() => {
    const span = LAST_YEAR - FIRST_YEAR + 1;
    return Array.from({ length: span + 1 }, (_, i) => PAD_X + (i / span) * usableW);
  }, [usableW]);

  const appear = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative w-full bg-paper font-jp min-h-screen flex flex-col justify-between px-6 lg:pr-16 pt-24 pb-10">
      <PageBackground palette={palettes.index} />

      <motion.div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10" {...appear(0.1)}>
        <div className="lg:col-span-2 marginalia">(00)</div>
        <div className="lg:col-span-10 marginalia">Ama-cho, Oki Islands — Shimane, Japan</div>
      </motion.div>

      {/*
        右端に立てる 1 行。参考サイトが同じ位置に使っている語彙で、
        こちらは最新の日記への導線にしている。
      */}
      <motion.div
        className="hidden lg:block absolute right-5 top-1/2 -translate-y-1/2 z-10"
        {...appear(1.2)}
      >
        <Link to={sections[2].path} className="upright marginalia hover:!text-ink transition-colors no-underline">
          {latest.created_at} — 最新の日記
        </Link>
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 my-14 lg:my-0">
        <div className="lg:col-span-2" />
        <div className="lg:col-span-10">
          <motion.h1
            className="m-0 font-display text-[38px] sm:text-[50px] md:text-[60px] leading-[1.18] tracking-[0.01em] text-ink"
            {...appear(0.2)}
          >
            {profile.nameJa}
          </motion.h1>
          <motion.p className="mt-4 marginalia" {...appear(0.35)}>
            {profile.nameEn}
          </motion.p>
          <motion.p
            className="mt-9 font-display text-[16px] sm:text-[19px] text-ink/70 tracking-[0.01em] m-0"
            {...appear(0.5)}
          >
            {profile.theme}
          </motion.p>
        </div>
      </div>

      {/* できごとの目盛り */}
      <motion.div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10" {...appear(0.7)}>
        <div className="lg:col-span-2 marginalia mb-4 lg:mb-0">{timeline.length} Events</div>

        <div className="lg:col-span-10">
          {/*
            preserveAspectRatio="none" で横だけ伸ばす。
            高さを auto にすると幅に比例して縮み、狭い画面では
            目盛りが 8px ほどに潰れて読めなくなる。高さは固定する。
          */}
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="w-full overflow-visible"
            style={{ height: VIEW_H }}
            preserveAspectRatio="none"
            aria-label={`${FIRST_YEAR}年から${LAST_YEAR}年までの${timeline.length}のできごと`}
            role="img"
          >
            {yearLines.map((x, i) => (
              <line
                key={`y${i}`}
                x1={x}
                x2={x}
                y1={BASELINE_Y - 4}
                y2={BASELINE_Y}
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                className="text-ink/15"
              />
            ))}

            <motion.line
              x1={PAD_X}
              x2={VIEW_W - PAD_X}
              y1={BASELINE_Y}
              y2={BASELINE_Y}
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              className="text-ink/25"
              initial={reduceMotion ? undefined : { pathLength: 0 }}
              animate={reduceMotion ? undefined : { pathLength: 1 }}
              transition={{ duration: 1.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />

            {fractions.map((f, i) => {
              const x = PAD_X + f * usableW;
              return (
                <motion.line
                  key={timeline[i].title}
                  x1={x}
                  x2={x}
                  y1={BASELINE_Y}
                  y2={TICK_TOP}
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  className="text-ink/45"
                  initial={reduceMotion ? undefined : { opacity: 0, scaleY: 0 }}
                  animate={reduceMotion ? undefined : { opacity: 1, scaleY: 1 }}
                  style={{ transformOrigin: `${x}px ${BASELINE_Y}px` }}
                  transition={{ duration: 0.5, delay: 1.1 + i * 0.045, ease: 'easeOut' }}
                />
              );
            })}
          </svg>

          <div className="flex justify-between mt-3">
            <span className="marginalia">{FIRST_YEAR}</span>
            <span className="marginalia">{LAST_YEAR}</span>
          </div>
        </div>
      </motion.div>

      {/* 目次 */}
      <motion.nav
        className="relative z-10 grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 mt-14 lg:mt-0"
        aria-label="目次"
        {...appear(1.0)}
      >
        <div className="lg:col-span-2 marginalia mb-4 lg:mb-0">Contents</div>
        <ul className="lg:col-span-10 list-none m-0 p-0 border-t border-ink/15">
          {sections.map((section) => (
            <li key={section.path} className="border-b border-ink/15">
              <Link
                to={section.path}
                className="group flex items-baseline gap-4 sm:gap-8 py-4 no-underline"
              >
                <span className="marginalia w-8 shrink-0">({section.index})</span>
                <span className="marginalia hidden sm:block w-20 shrink-0">{section.label}</span>
                <span className="font-display text-[17px] sm:text-[20px] text-ink flex-1 group-hover:opacity-60 transition-opacity duration-300">
                  {section.name}
                </span>
                <span className="marginalia hidden md:block">{section.meta}</span>
                <span className="marginalia transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </motion.nav>
    </section>
  );
};

export default Index;
