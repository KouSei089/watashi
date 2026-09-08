import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

const SIZE = 13;
const HOVER_SCALE = 2.9;

const isCoarsePointer = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(pointer: coarse)').matches || window.innerWidth < 768);

/**
 * カーソル。
 *
 * 参考にした andmade.jp は自前のカーソルを持たず、OS のものをそのまま
 * 使っている。あの抑制された紙面に合わせ、こちらも主張しない
 * 細い輪だけにしている。リンクの上でだけ静かに開く。
 *
 * 位置はばねを効かせず点に直結させる。遅れて追いかける作りは
 * 気持ちがいい反面、読ませる紙面では目が持っていかれる。
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

  // 開閉だけをばねで受ける
  const scale = useSpring(1, { stiffness: 380, damping: 30 });

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
    scale.set(hovered ? HOVER_SCALE : 1);
  }, [hovered, scale]);

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

  return (
    <motion.div
      aria-hidden="true"
      /*
        opacity は style ではなく animate で渡す。
        MotionValue を含む style に生の opacity を混ぜると
        framer-motion が初期値のまま握り続け、state を更新しても
        反映されない（輪が透明のまま出てこない）。
      */
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: SIZE,
        height: SIZE,
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        scale,
        borderRadius: '50%',
        border: '1px solid rgba(17,17,17,0.55)',
        backgroundColor: hovered ? 'rgba(17,17,17,0.06)' : 'transparent',
        transitionProperty: 'background-color',
        transitionDuration: '0.35s',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default Cursor;
