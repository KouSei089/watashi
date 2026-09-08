import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const VIEW_W = 1000;
const VIEW_H = 44;
const PAD_X = 2;
const BASELINE_Y = 34;
const TICK_TOP = 8;

interface TickRuleProps {
  /** 目盛りの位置。0..1 */
  fractions: number[];
  /** 目盛りより薄い、区切りの位置。0..1 */
  dividers?: number[];
  /** 左端と右端に添える文字 */
  ends?: [string, string];
  /** 各目盛りの下に置く見出し */
  labels?: string[];
  title: string;
  delay?: number;
}

/**
 * 表紙で使っている「値を実際の位置に打った目盛り」を部品にしたもの。
 *
 * 装飾ではなく、図そのものが情報になっているのが要点。
 * 章ごとに違う値を渡して、同じ語彙で別のことを示す。
 *
 * preserveAspectRatio="none" で横だけ伸ばし、高さは固定する。
 * auto にすると狭い画面で目盛りが潰れて読めなくなる。
 */
const TickRule: React.FC<TickRuleProps> = ({
  fractions,
  dividers = [],
  ends,
  labels,
  title,
  delay = 0,
}) => {
  const reduceMotion = useReducedMotion();
  const usableW = VIEW_W - PAD_X * 2;

  return (
    <div>
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full overflow-visible"
        style={{ height: VIEW_H }}
        preserveAspectRatio="none"
        role="img"
        aria-label={title}
      >
        {dividers.map((d, i) => {
          const x = PAD_X + d * usableW;
          return (
            <line
              key={`d${i}`}
              x1={x}
              x2={x}
              y1={BASELINE_Y - 4}
              y2={BASELINE_Y}
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              className="text-ink/15"
            />
          );
        })}

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
          transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
        />

        {fractions.map((f, i) => {
          const x = PAD_X + f * usableW;
          return (
            <motion.line
              key={`t${i}`}
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
              transition={{ duration: 0.5, delay: delay + 0.3 + i * 0.045, ease: 'easeOut' }}
            />
          );
        })}
      </svg>

      {ends && (
        <div className="flex justify-between mt-3">
          <span className="marginalia">{ends[0]}</span>
          <span className="marginalia">{ends[1]}</span>
        </div>
      )}

      {labels && (
        <div className="relative mt-3 h-4">
          {labels.map((label, i) => (
            <span
              key={label}
              className="marginalia absolute -translate-x-1/2 whitespace-nowrap"
              style={{ left: `${(PAD_X + fractions[i] * usableW) / VIEW_W * 100}%` }}
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TickRule;
