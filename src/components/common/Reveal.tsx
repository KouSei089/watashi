import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion, Variants } from 'framer-motion';

export const revealContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
  },
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: 'div' | 'section';
}

/**
 * スクロールで一度だけ現れるラッパ。
 *
 * framer-motion の whileInView を直接使うと、ページ遷移直後の
 * スクロール位置リセットと発火が競合して opacity が 0 付近で固まることがある。
 * useInView で「見えたか」を明示的な状態として持ち、animate に流すことで
 * その競合を避ける。reduced-motion のときは最初から表示する。
 */
const Reveal: React.FC<RevealProps> = ({ children, className = '', id, as = 'div' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduceMotion = useReducedMotion();
  const visible = inView || !!reduceMotion;

  const Component = as === 'section' ? motion.section : motion.div;

  return (
    <Component
      id={id}
      ref={ref}
      className={className}
      initial="hidden"
      animate={visible ? 'visible' : 'hidden'}
      variants={revealContainer}
    >
      {children}
    </Component>
  );
};

export default Reveal;
