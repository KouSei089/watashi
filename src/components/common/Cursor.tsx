import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/** 輪の直径。年表の軸に並ぶ輪と同じ寸法にしてある */
const RING = 15;
const RING_HOVER = 31;
const DOT = 3;

const isCoarsePointer = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(pointer: coarse)').matches || window.innerWidth < 768);

/**
 * カーソル。
 *
 * 細い輪と、そのまんなかの小さな点。
 * 年表の軸に並ぶ輪と同じ構成にしてあり、サイト内の他の図と語彙が揃う。
 *
 * 点は座標に直結させ、輪だけをわずかに遅らせている。
 * 全部を遅らせると目が持っていかれ、全部を直結させると機械的すぎる。
 * 押している位置は点が正確に示し、輪は気配として付いてくる。
 *
 * 輪の線は 1px より細くしたいので、太さではなく不透明度で軽くしている。
 * 端末によっては 0.5px が丸ごと消えることがあるため。
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

  // 輪だけ、ほんの少し遅れて付いてくる
  const ringX = useSpring(x, { stiffness: 900, damping: 45, mass: 0.35 });
  const ringY = useSpring(y, { stiffness: 900, damping: 45, mass: 0.35 });
  const size = useSpring(RING, { stiffness: 320, damping: 28 });

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
      const target = e.target as Element | null;
      setHovered(!!target?.closest?.(targets));
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
    size.set(hovered ? RING_HOVER : RING);
  }, [hovered, size]);

  /*
    OS のカーソルを隠すのは、自前の輪が実際に描かれてから。
    描画前や、何らかの理由で出せていないときにまで隠すと、
    何も見えないまま操作させることになる。
  */
  useEffect(() => {
    if (!enabled || !visible) return;
    document.documentElement.classList.add('has-custom-cursor');
    return () => document.documentElement.classList.remove('has-custom-cursor');
  }, [enabled, visible]);

  if (!enabled) return null;

  const common = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    translateX: '-50%',
    translateY: '-50%',
    pointerEvents: 'none' as const,
    borderRadius: '50%',
  };

  return (
    <>
      {/* 輪 */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          ...common,
          x: ringX,
          y: ringY,
          width: size,
          height: size,
          border: `1px solid rgba(17,17,17,${hovered ? 0.45 : 0.32})`,
          transition: 'border-color 0.3s ease',
          zIndex: 9998,
        }}
      />

      {/* まんなかの点。座標に直結する */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          ...common,
          x,
          y,
          width: DOT,
          height: DOT,
          backgroundColor: `rgba(17,17,17,${hovered ? 0.85 : 0.6})`,
          transition: 'background-color 0.3s ease',
          zIndex: 9999,
        }}
      />
    </>
  );
};

export default Cursor;
