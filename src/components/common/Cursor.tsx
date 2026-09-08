import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

const ARM = 9; // 十字の腕の長さ
const HOVER_SCALE = 1.9;

const isCoarsePointer = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(pointer: coarse)').matches || window.innerWidth < 768);

/**
 * カーソル。
 *
 * 以前は 48px の輪と点が遅れて追いかける作りで、
 * 情報を整然と並べる今の紙面には過剰だった。
 * 表紙の目盛りと同じ語彙の、細い十字（レティクル）にしている。
 * リンクの上では十字が開き、線が濃くなる。
 *
 * タッチ機器と reduced-motion では出さず、OS のカーソルに任せる。
 */
const Cursor: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // 十字そのものは遅れずに付いてくる。開閉だけをばねで受ける。
  const scale = useSpring(1, { stiffness: 420, damping: 32 });

  useEffect(() => {
    const decide = () => setEnabled(!isCoarsePointer() && !reduceMotion);
    decide();
    window.addEventListener('resize', decide);
    return () => window.removeEventListener('resize', decide);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    const targets = 'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setHovered(!!(e.target as Element)?.closest?.(targets));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled, x, y]);

  useEffect(() => {
    scale.set(hovered ? HOVER_SCALE : 1);
  }, [hovered, scale]);

  // 出さないときは OS のカーソルをそのまま使う
  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-custom-cursor');
    return () => document.documentElement.classList.remove('has-custom-cursor');
  }, [enabled]);

  if (!enabled) return null;

  return (
    <motion.svg
      aria-hidden="true"
      width={ARM * 2}
      height={ARM * 2}
      viewBox={`0 0 ${ARM * 2} ${ARM * 2}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        scale,
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.25s ease',
      }}
    >
      <line
        x1={0}
        y1={ARM}
        x2={ARM * 2}
        y2={ARM}
        stroke="currentColor"
        strokeWidth="1"
        className={hovered ? 'text-ink/70' : 'text-ink/35'}
      />
      <line
        x1={ARM}
        y1={0}
        x2={ARM}
        y2={ARM * 2}
        stroke="currentColor"
        strokeWidth="1"
        className={hovered ? 'text-ink/70' : 'text-ink/35'}
      />
    </motion.svg>
  );
};

export default Cursor;
