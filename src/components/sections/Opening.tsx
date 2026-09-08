import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../../data/profile';
import { timeline, timelineFractions, FIRST_YEAR, LAST_YEAR } from '../../data/timeline';
import { useScrollTo } from '../../lib/lenis';
import OpeningBackground from './OpeningBackground';

const VIEW_W = 1000;
const VIEW_H = 44;
const PAD_X = 2;
const BASELINE_Y = 34;
const TICK_TOP = 8;

/**
 * サイトの冒頭。
 *
 * 写真は置かない。代わりに、年表の 16 のできごとを実際の年の位置に打った
 * 目盛りを置いている。装飾としての幾何ではなく、図そのものが情報になる。
 * 2016 から 2019 は間が空き、2025 は 4 本が寄る。この粗密が
 * そのまま「これまでのわたし」の横スクロールの粗密と一致している。
 */
const Opening: React.FC = () => {
  const scrollTo = useScrollTo();
  const reduceMotion = useReducedMotion();

  const fractions = React.useMemo(() => timelineFractions(), []);
  const usableW = VIEW_W - PAD_X * 2;

  // 年の境目。10 年ぶんの薄い区切り。
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
    <section className="relative w-full bg-paper font-jp min-h-screen flex flex-col justify-between px-6 md:px-12 pt-28 pb-10">
      <OpeningBackground />

      {/* 所在を示す小さな標記 */}
      <motion.div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10" {...appear(0.1)}>
        <div className="lg:col-span-2 marginalia">(00)</div>
        <div className="lg:col-span-10 marginalia">Ama-cho, Oki Islands — Shimane, Japan</div>
      </motion.div>

      {/* 名前とテーマ */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 my-16 lg:my-0">
        <div className="lg:col-span-2" />
        <div className="lg:col-span-10">
          <motion.h1
            className="m-0 text-[34px] sm:text-[44px] md:text-[52px] leading-[1.2] tracking-[0.04em] text-ink font-medium"
            {...appear(0.2)}
          >
            {profile.nameJa}
          </motion.h1>
          <motion.p className="mt-4 marginalia" {...appear(0.35)}>
            {profile.nameEn}
          </motion.p>
          <motion.p
            className="mt-10 text-[14px] sm:text-[16px] text-ink/60 tracking-[0.06em] m-0"
            {...appear(0.5)}
          >
            {profile.theme}
          </motion.p>
        </div>
      </div>

      {/* できごとの目盛り */}
      <motion.div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10" {...appear(0.7)}>
        <div className="lg:col-span-2 marginalia mb-4 lg:mb-0">
          {timeline.length} Events
        </div>

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
            {/* 年の区切り */}
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

            {/* 時間軸 */}
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

            {/* できごと。同じ年のものは年の幅の中で散らしてある */}
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

      {/* 読み進める合図 */}
      <motion.div className="relative z-10 flex justify-end" {...appear(1.4)}>
        <button
          type="button"
          onClick={() => scrollTo('#profile')}
          className="flex items-center gap-3 bg-transparent border-0 p-0 text-ink/40 hover:text-ink transition-colors duration-500"
          aria-label="本文へ進む"
        >
          <span className="marginalia">Scroll</span>
          <span className="block w-10 h-px bg-current" />
        </button>
      </motion.div>
    </section>
  );
};

export default Opening;
