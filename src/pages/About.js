import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Profile from '../components/features/Profile';
import EyecatchGrid from '../components/features/EyecatchGrid';
import Footer from '../components/layout/Footer';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const baseTimeline = [
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
// 最後に「現在…」を追加（title, dateは空）
const timeline = [
  ...baseTimeline,
  { title: "", date: "" }
];
const ITEM_MARGIN = 48;
const TIMELINE_HEIGHT = 200;
const ITEM_WIDTH = 300;
const COLOR_TEXT = "#222";

const DOT_SIZE = 4; // px
const DOT_GAP = 10; // px
const DOT_ANIMATION_DURATION = 400; // ms
const DOT_BOTTOM_OFFSET = 60; // px (さらに下に)

const About = () => {
  const scrollIconRef = useRef(null);
  const [showTimelineTitle, setShowTimelineTitle] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);

  // タイムライン用
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 点点アニメーション
  const [dotStep, setDotStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setDotStep((prev) => (prev + 1) % 3);
    }, DOT_ANIMATION_DURATION);
    return () => clearInterval(interval);
  }, []);

  // タイトル表示制御
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollIconRef.current) return;
      const rect = scrollIconRef.current.getBoundingClientRect();
      const iconCenter = rect.top + rect.height / 2;
      const windowCenter = window.innerHeight / 2;
      setShowTimelineTitle(iconCenter < windowCenter);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setPageVisible(true), 30);
    return () => clearTimeout(timer);
  }, []);

  // 横スクロール＆ピン留め
  useLayoutEffect(() => {
    let ctx;
    function setup() {
      if (trackRef.current) {
        gsap.set(trackRef.current, { x: 0 });
      }
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const sectionWidth = section.offsetWidth;
      // 余白をsection幅の1.2倍に
      const extraSpace = sectionWidth * 1.2;
      // 線の長さ = 「現在…」までのカード幅
      const lineWidth = (timeline.length - 1) * (ITEM_WIDTH + ITEM_MARGIN) + ITEM_WIDTH;

      // track全体の幅
      const totalWidth = lineWidth + extraSpace;
      track.style.width = `${totalWidth}px`;

      const scrollLength = totalWidth - sectionWidth;

      ScrollTrigger.getAll().forEach((t) => t.kill());

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: "center center", // 画面中央でピン留め開始
          end: () => `+=${scrollLength}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(track, {
              x: -scrollLength * self.progress,
              overwrite: "auto",
            });

            const cards = track.children;
            let currentActive = null;

            if (self.progress === 0) {
              currentActive = 0;
            } else {
              for (let i = 0; i < timeline.length; i++) {
                const card = cards[i];
                const rect = card.getBoundingClientRect();
                const sectionRect = section.getBoundingClientRect();
                const dist = Math.abs(rect.left + rect.width / 2 - (sectionRect.left + sectionRect.width / 2));
                if (dist < rect.width / 2) {
                  currentActive = i;
                  break;
                }
              }
            }
            setActiveIndex(currentActive);
          },
        });
      }, section);
    }

    setup();
    window.addEventListener("resize", setup);

    return () => {
      window.removeEventListener("resize", setup);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (ctx) ctx.revert();
    };
  }, []);

  // 点点アニメーション
  // 0: .__  1: .._  2: ...
  const dotOpacities = [
    [1, 0.2, 0.2],   // .
    [1, 1, 0.2],     // ..
    [1, 1, 1],       // ...
  ][dotStep];

  const renderAnimatedDots = () => (
    <div
      style={{
        display: "flex",
        gap: DOT_GAP,
        marginTop: DOT_BOTTOM_OFFSET,
        justifyContent: "center",
        alignItems: "center",
        minHeight: DOT_SIZE * 2,
        width: DOT_SIZE * 3 + DOT_GAP * 2,
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: DOT_SIZE,
            height: DOT_SIZE,
            borderRadius: "50%",
            backgroundColor: "#000",
            opacity: dotOpacities[i],
            transform: `scale(${dotOpacities[i] === 1 ? 1.2 : 1})`,
            transition: "opacity 0.3s, transform 0.3s",
          }}
        />
      ))}
    </div>
  );

  return (
    <div
      className={`bg-white min-h-screen transition-opacity duration-1000 font-jp ${pageVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        transitionProperty: 'opacity',
      }}
    >
      <Profile scrollIconRef={scrollIconRef} />
      {/* タイムラインタイトル */}
      <div id="history" style={{ height: '2.5rem', marginTop: '-2.5rem' }}></div>
      <section
        className={`
          max-w-5xl mx-auto px-4 sm:px-8 py-12
          transition-all duration-700
          ${showTimelineTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}
        `}
        style={{
          transitionProperty: 'opacity, transform',
        }}
      >
        <h2
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-jp text-matte tracking-wider mb-10 text-left`}
          style={{
            width: 'auto',
            pointerEvents: 'auto',
            transition: 'all 0.3s cubic-bezier(.4,2,.3,1)',
          }}
        >
          これまでのわたし
        </h2>
      </section>
      {/* タイムライン本体 */}
      <section
        ref={sectionRef}
        className="max-w-5xl mx-auto px-4 sm:px-8"
        style={{
          color: COLOR_TEXT,
          position: "relative",
          minHeight: TIMELINE_HEIGHT,
          overflow: "hidden",
          background: "#fff",
          transition: "box-shadow 0.3s",
          boxShadow: "none",
          paddingTop: 0,
          paddingBottom: 0,
        }}
      >
        <div
          style={{
            width: "100%",
            height: TIMELINE_HEIGHT,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            overflow: "visible",
            position: "relative",
          }}
        >
          <div
            ref={trackRef}
            className="flex items-center font-jp"
            style={{
              height: "100%",
              position: "relative",
              display: "inline-flex",
              transition: "padding 0.2s",
            }}
          >
            {timeline.map((item, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: "center",
                  width: ITEM_WIDTH,
                  minWidth: ITEM_WIDTH,
                  marginRight: idx < timeline.length - 1 ? ITEM_MARGIN : 0,
                  opacity: activeIndex === idx ? 1 : 0.6,
                  color: activeIndex === idx ? "#000" : "#888",
                  fontWeight: activeIndex === idx ? "bold" : "normal",
                  transition: "opacity 0.2s, color 0.2s, font-weight 0.2s",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {/* 通常カード */}
                {idx !== timeline.length - 1 && (
                  <>
                    <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 4 }}>
                      {item.date}
                    </div>
                    <div style={{ fontSize: 14 }}>
                      {item.title}
                    </div>
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: activeIndex === idx ? "#000" : "#888",
                        margin: "12px auto 0",
                      }}
                    />
                  </>
                )}
                {/* 最後の「現在…」カード */}
                {idx === timeline.length - 1 && (
                  <>
                    {/* テキストは表示しない */}
                    {renderAnimatedDots()}
                  </>
                )}
              </div>
            ))}
            {/* 余白div */}
            <div style={{ width: `120vw`, minWidth: 120 }} />
            {/* タイムライン線（下線） */}
            <div
              style={{
                position: "absolute",
                bottom: 8,
                left: 0,
                height: 1,
                backgroundColor: "#ccc",
                width: `${(timeline.length - 1) * (ITEM_WIDTH + ITEM_MARGIN) + ITEM_WIDTH}px`, // 「現在…」まで
                zIndex: 1,
              }}
            />
          </div>
        </div>
      </section>
      <EyecatchGrid />
      <Footer />
    </div>
  );
};

export default About;
