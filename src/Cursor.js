// Cursor.js
import React, { useEffect, useRef, useState } from "react";

const RING_SIZE = 48;
const RING_SIZE_HOVER = 88;
const DOT_SIZE = 8;
const CURSOR_COLOR = "#D7D7D7";
const RING_BORDER_WIDTH = 1.2;

function isTouchDevice() {
  // タッチイベントが使えるか、または画面幅が一定以下ならスマホとみなす
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.innerWidth < 768
  );
}

const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const ring = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const ringSizeRef = useRef(RING_SIZE);

  const [hovered, setHovered] = useState(false);
  const [showCursor, setShowCursor] = useState(() => !isTouchDevice());

  // デバイス判定（リサイズ時も対応）
  useEffect(() => {
    const handleResize = () => {
      setShowCursor(!isTouchDevice());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!showCursor) return;

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    document.addEventListener("mousemove", handleMouseMove);

    const hoverSelectors = "a, button, [data-cursor-hover], .hover-target";
    const handleMouseOver = (e) => {
      if (e.target.closest(hoverSelectors)) setHovered(true);
    };
    const handleMouseOut = (e) => {
      if (e.target.closest(hoverSelectors)) setHovered(false);
    };
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    let frame;
    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }
      ring.current.x += (mouse.current.x - ring.current.x) * 0.14;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.14;
      const targetSize = hovered ? RING_SIZE_HOVER : RING_SIZE;
      ringSizeRef.current += (targetSize - ringSizeRef.current) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
        ringRef.current.style.width = `${ringSizeRef.current}px`;
        ringRef.current.style.height = `${ringSizeRef.current}px`;
        ringRef.current.style.marginLeft = `${-ringSizeRef.current / 2}px`;
        ringRef.current.style.marginTop = `${-ringSizeRef.current / 2}px`;
      }
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(frame);
    };
  }, [hovered, showCursor]);

  if (!showCursor) {
    // カスタムカーソルも、CSSでのカーソル非表示も適用しない
    return null;
  }

  return (
    <>
      {/* 外側のリング */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: RING_SIZE,
          height: RING_SIZE,
          marginLeft: -RING_SIZE / 2,
          marginTop: -RING_SIZE / 2,
          pointerEvents: "none",
          zIndex: 9999,
          border: `${RING_BORDER_WIDTH}px solid ${CURSOR_COLOR}`,
          borderRadius: "50%",
          background: "transparent",
          boxSizing: "border-box",
          transition: "border-color 0.2s",
          opacity: 1,
        }}
      />
      {/* 中央の点 */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: DOT_SIZE,
          height: DOT_SIZE,
          marginLeft: -DOT_SIZE / 2,
          marginTop: -DOT_SIZE / 2,
          pointerEvents: "none",
          zIndex: 10000,
          borderRadius: "50%",
          background: CURSOR_COLOR,
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.18s cubic-bezier(.4,2,.3,1)",
        }}
      />
      <style>{`
        body, * { cursor: none !important; }
      `}</style>
    </>
  );
};

export default Cursor;
