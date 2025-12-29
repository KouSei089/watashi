import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Profile from '../components/features/Profile';
import EyecatchGrid from '../components/features/EyecatchGrid';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  title: string;
  date: string;
}

interface AboutProps {
  onScrollEnd?: (atEnd: boolean) => void;
}

const baseTimeline: TimelineItem[] = [
  { title: "GU/ジーユー 入社", date: "2016" },
  { title: "本を読みはじめる", date: "2016" },
  { title: "環境問題に興味を持ちはじめる", date: "2019" },
  { title: "RUNTEQでのWeb開発学習", date: "2021" },
  { title: "GU/ジーユー 退職", date: "2021" },
  { title: "Mikke 開発・リリース", date: "2022" },
  { title: "チームラボ/teamLab エンジニアとして入社", date: "2022" },
  { title: "不動産業界 保守開発 BEエンジニア", date: "2022" },
  { title: "不動産業界 新規開発 BEエンジニア", date: "2023-2024" },
  { title: "ECサイト 認証基盤 開発責任者", date: "2024" },
  { title: "チームラボ/teamLab カタリストチームへ移籍", date: "2024" },
  { title: "飲食デリバリーサイト プロジェクトマネージャ", date: "2024-2025" },
  { title: "チームラボ/teamLab 退職", date: "2025" },
  { title: "watashi 制作", date: "2025" },
  { title: "島根県隠岐諸島海士町へ移住", date: "2025" },
  { title: "株式会社海士 入社", date: "2025" },
];

const timeline: TimelineItem[] = [...baseTimeline, { title: "", date: "" }];

const ITEM_MARGIN = 48;
const ITEM_WIDTH = 300;
const TIMELINE_HEIGHT = 200;

const About: React.FC<AboutProps> = ({ onScrollEnd }) => {
  const scrollIconRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const footerTriggerRef = useRef<HTMLDivElement>(null); // Footer判定用

  const [showTimelineTitle, setShowTimelineTitle] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    setPageVisible(true);
  }, []);

  // Footer表示判定ロジック (数値計算を排除し、Observerで安定化)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (onScrollEnd) onScrollEnd(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '0px 0px 50px 0px' }
    );

    if (footerTriggerRef.current) observer.observe(footerTriggerRef.current);
    return () => observer.disconnect();
  }, [onScrollEnd]);

  // スクロールアイコンとタイトルの連動
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollIconRef.current) return;
      const rect = scrollIconRef.current.getBoundingClientRect();
      setShowTimelineTitle(rect.top < window.innerHeight / 2);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const isMobile = window.innerWidth < 768;
      const extraSpace = isMobile ? window.innerWidth * 0.4 : window.innerWidth * 1.0;
      const totalTimelineWidth = (timeline.length - 1) * (ITEM_WIDTH + ITEM_MARGIN) + ITEM_WIDTH;
      const scrollLength = totalTimelineWidth + extraSpace - window.innerWidth;

      track.style.width = `${totalTimelineWidth + extraSpace}px`;

      ScrollTrigger.create({
        trigger: section,
        start: "center center",
        end: () => `+=${scrollLength}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          gsap.set(track, { x: -scrollLength * self.progress });
          const centerX = window.innerWidth / 2;
          const cards = track.children;
          for (let i = 0; i < timeline.length; i++) {
            if (!cards[i]) continue;
            const rect = cards[i].getBoundingClientRect();
            if (rect.left < centerX && rect.right > centerX) {
              setActiveIndex(i);
              break;
            }
          }
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className={`bg-white min-h-screen transition-opacity duration-1000 font-jp overflow-x-hidden w-full ${pageVisible ? 'opacity-100' : 'opacity-0'}`}>
      <motion.div className="fixed top-0 left-0 right-0 h-[1px] bg-black z-[100] origin-left" style={{ scaleX }} />
      
      <Profile scrollIconRef={scrollIconRef} />

      <section className="max-w-5xl mx-auto px-6 sm:px-8 py-12 w-full">
        <h2 className="text-4xl sm:text-5xl md:text-7xl text-matte tracking-wider mb-10 transition-opacity duration-1000" style={{ opacity: showTimelineTitle ? 1 : 0.2 }}>
          これまでのわたし
        </h2>
      </section>

      <section ref={sectionRef} className="w-full relative overflow-hidden bg-white flex items-center" style={{ minHeight: '60vh' }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 w-full">
          <div className="relative" style={{ height: TIMELINE_HEIGHT }}>
            <div ref={trackRef} className="flex items-center relative h-full">
              {timeline.map((item, idx) => (
                <div key={idx} className="flex-shrink-0 flex flex-col items-center justify-center relative transition-all duration-500" style={{ width: ITEM_WIDTH, marginRight: idx < timeline.length - 1 ? ITEM_MARGIN : 0, opacity: activeIndex === idx ? 1 : 0.3, transform: `scale(${activeIndex === idx ? 1.05 : 0.95})` }}>
                  {idx !== timeline.length - 1 ? (
                    <>
                      <div className="text-xl font-bold mb-1">{item.date}</div>
                      <div className="text-sm font-light text-center px-4 h-10 flex items-center">{item.title}</div>
                      <div className={`w-1.5 h-1.5 rounded-full mt-4 transition-colors duration-500 ${activeIndex === idx ? 'bg-black' : 'bg-gray-200'}`} />
                    </>
                  ) : (
                    <div className="flex gap-2 mt-10 text-xs text-gray-400 italic">...</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <EyecatchGrid />

      {/* Footer発火用の透明な目印 */}
      <div ref={footerTriggerRef} className="h-4 w-full" />
    </div>
  );
};

export default About;