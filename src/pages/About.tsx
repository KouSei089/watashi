import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Profile from '../components/features/Profile';
import EyecatchGrid from '../components/features/EyecatchGrid';
import Footer from '../components/layout/Footer';
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
const DOT_ANIMATION_DURATION = 400;

const About: React.FC<AboutProps> = ({ onScrollEnd }) => {
  const scrollIconRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [showTimelineTitle, setShowTimelineTitle] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [dotStep, setDotStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setPageVisible(true), 30);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotStep((prev) => (prev + 1) % 3);
    }, DOT_ANIMATION_DURATION);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollIconRef.current) return;
      const rect = scrollIconRef.current.getBoundingClientRect();
      const iconCenter = rect.top + rect.height / 2;
      const windowCenter = window.innerHeight / 2;
      const isPastCenter = iconCenter < windowCenter;
      
      setShowTimelineTitle(isPastCenter);
      if (onScrollEnd) onScrollEnd(isPastCenter);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScrollEnd]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const sectionWidth = section.offsetWidth;
      const extraSpace = sectionWidth * 1.2;
      const lineWidth = (timeline.length - 1) * (ITEM_WIDTH + ITEM_MARGIN) + ITEM_WIDTH;
      const totalWidth = lineWidth + extraSpace;
      
      track.style.width = `${totalWidth}px`;
      const scrollLength = totalWidth - sectionWidth;

      ScrollTrigger.create({
        trigger: section,
        start: "center center",
        end: () => `+=${scrollLength}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(track, { x: -scrollLength * self.progress });
          const cards = track.children;
          const centerX = section.getBoundingClientRect().left + sectionWidth / 2;
          for (let i = 0; i < timeline.length; i++) {
            const rect = cards[i].getBoundingClientRect();
            if (Math.abs(rect.left + rect.width / 2 - centerX) < rect.width / 2) {
              setActiveIndex(i);
              break;
            }
          }
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const dotOpacities = [[1, 0.2, 0.2], [1, 1, 0.2], [1, 1, 1]][dotStep];

  return (
    <div className={`bg-white min-h-screen transition-opacity duration-1000 font-jp ${pageVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Profile scrollIconRef={scrollIconRef} />

      <div id="history" className="h-10 -mt-10" />
      <section className={`max-w-5xl mx-auto px-4 sm:px-8 py-12 transition-all duration-700 ${showTimelineTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-matte tracking-wider mb-10">これまでのわたし</h2>
      </section>

      <section ref={sectionRef} className="max-w-5xl mx-auto px-4 sm:px-8 relative overflow-hidden bg-white" style={{ minHeight: TIMELINE_HEIGHT }}>
        <div className="w-full flex items-center justify-start overflow-visible relative" style={{ height: TIMELINE_HEIGHT }}>
          <div ref={trackRef} className="flex items-center relative transition-padding duration-200">
            {timeline.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center relative transition-all duration-300" style={{ width: ITEM_WIDTH, marginRight: idx < timeline.length - 1 ? ITEM_MARGIN : 0, opacity: activeIndex === idx ? 1 : 0.4, transform: `scale(${activeIndex === idx ? 1.05 : 1})` }}>
                {idx !== timeline.length - 1 ? (
                  <>
                    <div className="text-xl font-bold mb-1">{item.date}</div>
                    <div className="text-sm font-light text-center px-4 h-10 flex items-center">{item.title}</div>
                    <div className={`w-1.5 h-1.5 rounded-full mt-4 transition-colors ${activeIndex === idx ? 'bg-black' : 'bg-gray-300'}`} />
                  </>
                ) : (
                  <div className="flex gap-2.5 mt-10 justify-center items-center h-10">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-black transition-all duration-300" style={{ opacity: dotOpacities[i], transform: `scale(${dotOpacities[i] === 1 ? 1.2 : 1})` }} />
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="w-[120vw] min-w-[120px]" />
            <div className="absolute bottom-2 left-0 h-px bg-gray-200 -z-10" style={{ width: `${(timeline.length - 1) * (ITEM_WIDTH + ITEM_MARGIN) + ITEM_WIDTH}px` }} />
          </div>
        </div>
      </section>

      <EyecatchGrid />
      <Footer />
    </div>
  );
};

export default About;