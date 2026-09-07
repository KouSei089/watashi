import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useReducedMotion } from 'framer-motion';
import { MAIN_VISUAL_URL } from '../../data/site';
import { useScrollTo } from '../../lib/lenis';

const RIPPLE_ANIMATION_DURATION = 4.0;
const NUM_RIPPLES = 4;

const NOISE_SVG = encodeURIComponent(`
  <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/></filter>
    <rect width="100" height="100" filter="url(#n)" opacity="0.4"/>
  </svg>
`);

/**
 * サイトの導入。
 *
 * 以前は fixed inset-0 の独立ページで、そもそもスクロールできなかった。
 * いまは 180vh のセクションの中で中身を sticky させ、
 * スクロール量に応じて主題の像のぼけが晴れていく。
 * 「スクロールする = 焦点が合う」をサイト全体の合図にしている。
 */
const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const [showBtnCircle, setShowBtnCircle] = useState(false);
  const scrollTo = useScrollTo();
  const reduceMotion = useReducedMotion();

  // 'end end' にすると、進捗 0→1 が sticky で像が留まっている区間
  // （セクション高 - 100vh）にちょうど重なる。
  // 'end start' だと像が画面から流れ去ったあとまで進捗が続き、
  // ぼけが晴れきる頃には見えなくなってしまう。
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // ぼけは晴らすが、モノクロのままにして静けさは保つ
  const blurPx = useTransform(scrollYProgress, [0, 0.7], [12, 0], { clamp: true });
  const imageOpacity = useTransform(scrollYProgress, [0, 0.7], [0.4, 0.92], { clamp: true });
  const filter = useMotionTemplate`blur(${blurPx}px) grayscale(1) brightness(1.05)`;

  // 読み進めると導入の合図は静かに退場する
  const cueOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0], { clamp: true });

  useEffect(() => {
    if (hovered) {
      setShowBtnCircle(true);
      return;
    }
    const timeoutId = setTimeout(() => setShowBtnCircle(false), 500);
    return () => clearTimeout(timeoutId);
  }, [hovered]);

  return (
    <section ref={sectionRef} className="relative h-[180vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white">
        <div className="flex flex-col items-center w-full max-w-2xl px-8">
          <motion.div
            className="w-full mb-20 flex justify-center overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 1.05 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 2.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              className="w-full h-auto rounded-sm will-change-[filter,opacity]"
              style={
                reduceMotion
                  ? { filter: 'grayscale(1) brightness(1.05)', opacity: 0.92 }
                  : { filter, opacity: imageOpacity }
              }
              src={MAIN_VISUAL_URL}
              alt="main"
            />
          </motion.div>

          <motion.div
            className="relative group"
            style={reduceMotion ? undefined : { opacity: cueOpacity }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.8, ease: 'easeOut' }}
          >
            {/* 遷移ボタンではなく、下へ読み進めるための合図になった */}
            <button
              type="button"
              onClick={() => scrollTo('#profile')}
              aria-label="本文へ進む"
              className="relative h-20 w-20 flex justify-center items-center outline-none bg-transparent border-0 p-0"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <div className={`w-1 h-1 rounded-full bg-black transition-all duration-700 ${hovered ? 'scale-[15] opacity-0' : 'opacity-20 scale-100'}`} />

              {!hovered && Array.from({ length: NUM_RIPPLES }).map((_, i) => (
                <span
                  key={i}
                  className="ripple-effect border-[0.2px] border-black absolute"
                  style={{ animationDelay: `${(i * RIPPLE_ANIMATION_DURATION) / NUM_RIPPLES}s` }}
                />
              ))}

              <div className={`absolute inset-[-10px] rounded-full transition-opacity duration-1000 ${showBtnCircle ? 'opacity-100' : 'opacity-0'}`}>
                <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                  <circle
                    cx="50" cy="50" r="48"
                    fill="transparent"
                    stroke="black"
                    strokeWidth="0.2"
                    strokeDasharray="301.6"
                    strokeDashoffset={hovered ? '0' : '301.6'}
                    style={{ transition: 'stroke-dashoffset 2.5s cubic-bezier(0.2, 0, 0.2, 1)' }}
                  />
                </svg>
              </div>

              <div
                className={`absolute inset-[-10px] rounded-full transition-all duration-[2000ms] overflow-hidden pointer-events-none ${hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,${NOISE_SVG}")`,
                  backgroundSize: '150px 150px',
                  mixBlendMode: 'multiply',
                }}
              />

              <span className={`absolute text-[8px] tracking-[0.4em] uppercase transition-all duration-1000 pointer-events-none ${hovered ? 'opacity-40 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                Scroll
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
