import React, { useState, useRef, useMemo, useLayoutEffect, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../common/SectionTitle';

interface TimelineItem {
  title: string;
  date: string;
}

const timeline: TimelineItem[] = [
  { title: 'GU/ジーユー 入社', date: '2016' },
  { title: '本を読みはじめる', date: '2016' },
  { title: '環境問題に興味を持ちはじめる', date: '2019' },
  { title: 'RUNTEQでのWeb開発学習', date: '2021' },
  { title: 'GU/ジーユー 退職', date: '2021' },
  { title: 'Mikke 開発・リリース', date: '2022' },
  { title: 'チームラボ/teamLab エンジニアとして入社', date: '2022' },
  { title: '不動産業界 保守開発 BEエンジニア', date: '2022' },
  { title: '不動産業界 新規開発 BEエンジニア', date: '2023-2024' },
  { title: 'ECサイト 認証基盤 開発責任者', date: '2024' },
  { title: 'チームラボ/teamLab カタリストチームへ移籍', date: '2024' },
  { title: '飲食デリバリーサイト プロジェクトマネージャ', date: '2024-2025' },
  { title: 'チームラボ/teamLab 退職', date: '2025' },
  { title: 'watashi 制作', date: '2025' },
  { title: '島根県隠岐諸島海士町へ移住', date: '2025' },
  { title: '株式会社海士 入社', date: '2025' },
];

const startYear = (date: string) => parseInt(date.slice(0, 4), 10);

const BASE_GAP = 48; // 同じ年のできごとどうしの最小の間隔
const YEAR_GAP = 150; // 年がひとつ空くごとに足される間隔
const TRACK_HEIGHT = 220;

/**
 * これまでのわたし。
 *
 * 横スクロールの位置を「項目の順番」ではなく「年の隔たり」で決めている。
 * 2016→2019 のように空いた年は間延びし、できごとが重なった 2025 は密集する。
 * 等間隔だったときは読み取れなかった、時間の濃淡がスクロール量として出る。
 */
const Timeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(300);
  const reduceMotion = useReducedMotion();

  // 幅の変化だけを見る。高さで再計算するとモバイルのアドレスバーの
  // 伸縮のたびに pin が組み直されて画面が跳ねる。
  useEffect(() => {
    const measure = () => setItemWidth(window.innerWidth < 640 ? 220 : 300);
    measure();

    let lastWidth = window.innerWidth;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(measure, 150);
    };

    window.addEventListener('resize', onResize);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // 各カードの横位置。年の差が空くほど間隔が広がる。
  const positions = useMemo(() => {
    let x = 0;
    return timeline.map((item, i) => {
      if (i > 0) {
        const gapYears = startYear(item.date) - startYear(timeline[i - 1].date);
        x += itemWidth + BASE_GAP + Math.max(0, gapYears) * YEAR_GAP;
      }
      return x;
    });
  }, [itemWidth]);

  const scrollLength = positions[positions.length - 1];

  useLayoutEffect(() => {
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      ScrollTrigger.create({
        trigger: section,
        start: 'center center',
        end: () => `+=${scrollLength}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const x = scrollLength * self.progress;
          gsap.set(track, { x: -x });

          // いま画面中央にいちばん近いカードを選ぶ。
          // 間隔が不均等になったので、進捗×件数では求まらない。
          let nearest = 0;
          for (let i = 1; i < positions.length; i += 1) {
            if (Math.abs(positions[i] - x) < Math.abs(positions[nearest] - x)) nearest = i;
          }
          setActiveIndex(nearest);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [positions, scrollLength, reduceMotion]);

  const activeYear = startYear(timeline[activeIndex].date);

  // reduced-motion では pin も横スクロールも行わず、素直な縦並びにする
  if (reduceMotion) {
    return (
      <section className="w-full bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-12">
          <SectionTitle id="history" className="mb-10">これまでのわたし</SectionTitle>
          <ol className="list-none m-0 p-0 border-l border-gray-200">
            {timeline.map((item) => (
              <li key={item.title} className="relative pl-6 pb-8">
                <span className="absolute left-[-3.5px] top-2 w-1.5 h-1.5 rounded-full bg-black" />
                <div className="text-xl font-bold">{item.date}</div>
                <div className="text-sm font-light">{item.title}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-12 w-full">
        <SectionTitle id="history">これまでのわたし</SectionTitle>
      </div>

      <section
        ref={sectionRef}
        className="w-full relative overflow-hidden bg-white flex items-center"
        style={{ minHeight: '60vh' }}
      >
        {/* 背景の巨大な年号。横に進んでいる実感を出す。
            mode="wait" にすると退場の完了を待つため、勢いよくスクロールした
            ときに年号が置いていかれる。重ねて同時にクロスフェードさせる。 */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <AnimatePresence initial={false}>
            <motion.span
              key={activeYear}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 0.05, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center text-[28vw] leading-none font-bold text-matte tracking-tighter"
            >
              {activeYear}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="w-full relative" style={{ height: TRACK_HEIGHT }}>
          {/* 時間軸そのもの */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-100" />

          <div
            ref={trackRef}
            className="relative h-full"
            style={{ marginLeft: `calc(50% - ${itemWidth / 2}px)`, width: scrollLength + itemWidth }}
          >
            {timeline.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={item.title}
                  className="absolute top-0 h-full flex flex-col items-center justify-center text-center transition-all duration-500"
                  style={{
                    left: positions[idx],
                    width: itemWidth,
                    opacity: isActive ? 1 : 0.3,
                    transform: `scale(${isActive ? 1.05 : 0.95})`,
                  }}
                >
                  <div className="text-xl font-bold mb-1">{item.date}</div>
                  <div className="text-sm font-light px-4 h-10 flex items-center">{item.title}</div>
                  <div className={`w-1.5 h-1.5 rounded-full mt-4 transition-colors duration-500 ${isActive ? 'bg-black' : 'bg-gray-200'}`} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Timeline;
