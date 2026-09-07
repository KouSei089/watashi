import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

/** Navbar の高さぶん、アンカー移動先を上に逃がす */
export const SCROLL_OFFSET = -72;

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

/**
 * 任意の要素へスクロールする。
 * Lenis が動いていればその慣性に乗せ、reduced-motion で Lenis を止めている
 * ときはブラウザ標準のジャンプにフォールバックする。
 */
export const useScrollTo = () => {
  const lenis = useLenis();

  return useCallback(
    (target: string | number) => {
      if (lenis) {
        lenis.scrollTo(target, { offset: SCROLL_OFFSET });
        return;
      }
      if (typeof target === 'number') {
        window.scrollTo(0, target);
        return;
      }
      const el = document.querySelector(target);
      if (el) {
        window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + SCROLL_OFFSET);
      }
    },
    [lenis]
  );
};

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // OSで「視差効果を減らす」が有効なら慣性スクロールごと無効化し、
    // ブラウザ標準のスクロールに任せる
    if (reduceMotion) return;

    const instance = new Lenis({
      duration: 0.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    instance.on('scroll', ScrollTrigger.update);

    // 以前は gsap.ticker.add に無名関数を渡しておきながら
    // gsap.ticker.remove(lenis.raf) で別の関数を外そうとしていたため、
    // ページ遷移のたびに ticker のコールバックが残り続けていた
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);

    // 高さが実際に変わったときだけ再計測する（画像の遅延読み込み対策）
    let lastHeight = document.body.scrollHeight;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const resizeObserver = new ResizeObserver(() => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const currentHeight = document.body.scrollHeight;
        if (currentHeight !== lastHeight) {
          lastHeight = currentHeight;
          instance.resize();
          ScrollTrigger.refresh();
        }
      }, 150);
    });
    resizeObserver.observe(document.body);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      resizeObserver.disconnect();
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, [reduceMotion]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
};
