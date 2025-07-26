// GsapHorizontalTimeline.jsx

import React, { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  { title: "GU/ジーユー 入社", date: "2016年2月" },
  { title: "本を読みはじめる", date: "2016年2月" },
  { title: "環境問題に興味を持ちはじめる", date: "2016年2月" },
  { title: "RUNTEQでのWeb開発学習", date: "2021年4月" },
  { title: "GU/ジーユー 退職", date: "2021年11月" },
  { title: "Mikke 開発・リリース", date: "2022年2月" },
  { title: "ポートフォリオサイト制作", date: "2022年4月" },
  { title: "チームラボ/teamLab 入社", date: "2022年6月" },
  { title: "チームラボ/teamLab 退職", date: "2025年4月" },
  { title: "株式会社海士", date: "2025年6月" },
];

const ITEM_HEIGHT = 140;
const ITEM_MARGIN = 48;
const TIMELINE_HEIGHT = 200;
const ITEM_WIDTH = 300;
const COLOR_TEXT = "#222";

const GsapHorizontalTimeline = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useLayoutEffect(() => {
    let ctx;
    function setup() {
      if (trackRef.current) {
        gsap.set(trackRef.current, { x: 0 });
      }
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      // sectionの幅を70vwに
      section.style.width = "70vw";
      section.style.maxWidth = "70vw";

      // trackの幅を計算
      const totalWidth = timeline.length * (ITEM_WIDTH + ITEM_MARGIN) - ITEM_MARGIN;

      // section中央にカードが来るようにパディング
      const sidePadding = (section.offsetWidth - ITEM_WIDTH) / 2;
      track.style.width = `${totalWidth + sidePadding * 2}px`;
      track.style.paddingLeft = `${sidePadding}px`;
      track.style.paddingRight = `${sidePadding}px`;

      // 横スクロール距離
      const scrollLength = totalWidth + sidePadding * 2 - section.offsetWidth;

      // 既存のScrollTriggerをkill
      ScrollTrigger.getAll().forEach((t) => t.kill());

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
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

            // activeIndexの計算
            const cards = track.children;
            let currentActive = null;
            for (let i = 0; i < timeline.length; i++) {
              const card = cards[i];
              const rect = card.getBoundingClientRect();
              const sectionRect = section.getBoundingClientRect();
              // section中央に一番近いカードをactive
              const dist = Math.abs(rect.left + rect.width / 2 - (sectionRect.left + sectionRect.width / 2));
              if (dist < rect.width / 2) {
                currentActive = i;
                break;
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

  return (
    <section
      ref={sectionRef}
      className="font-jp"
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
        width: "70vw",
        maxWidth: "70vw",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          width: "100%",
          height: TIMELINE_HEIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
            // width, paddingLeft, paddingRightはJSでセット
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
                transition: "opacity 0.2s",
              }}
            >
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
                  backgroundColor: "#000",
                  margin: "12px auto 0",
                }}
              />
            </div>
          ))}
          <div
            style={{
              position: "absolute",
              bottom: 8,
              left: 0,
              height: 1,
              backgroundColor: "#ccc",
              width: "100%",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default GsapHorizontalTimeline;
