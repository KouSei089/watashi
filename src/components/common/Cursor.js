import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const RING_SIZE = 48;
const RING_SIZE_HOVER = 88;
const DOT_SIZE = 8;
const CURSOR_COLOR = "#D7D7D7";
const RING_BORDER_WIDTH = 1.2;

function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.innerWidth < 768
  );
}

const Cursor = () => {
  const [hovered, setHovered] = useState(false);
  const [showCursor, setShowCursor] = useState(() => !isTouchDevice());

  // マウス位置の生の値
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // リング用のバネ設定（少し遅れて、弾力を持って追いかける）
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  
  // リングサイズ用のバネ
  const ringSize = useSpring(hovered ? RING_SIZE_HOVER : RING_SIZE, {
    stiffness: 200,
    damping: 25
  });

  useEffect(() => {
    const handleResize = () => setShowCursor(!isTouchDevice());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!showCursor) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const hoverSelectors = "a, button, [data-cursor-hover], .hover-target";
    const handleMouseOver = (e) => {
      if (e.target.closest(hoverSelectors)) setHovered(true);
    };
    const handleMouseOut = (e) => {
      if (e.target.closest(hoverSelectors)) setHovered(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [showCursor, mouseX, mouseY]);

  useEffect(() => {
    ringSize.set(hovered ? RING_SIZE_HOVER : RING_SIZE);
  }, [hovered, ringSize]);

  if (!showCursor) return null;

  return (
    <>
      {/* 外側のリング: useSpring により滑らかな遅延が発生 */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9999,
          border: `${RING_BORDER_WIDTH}px solid ${CURSOR_COLOR}`,
          borderRadius: "50%",
          background: "transparent",
          boxSizing: "border-box",
        }}
      />
      
      {/* 中央のドット: マウスに直結（遅延なし） */}
      <motion.div
        animate={{
          opacity: hovered ? 0 : 1,
          scale: hovered ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: mouseX,
          y: mouseY,
          width: DOT_SIZE,
          height: DOT_SIZE,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 10000,
          borderRadius: "50%",
          background: CURSOR_COLOR,
        }}
      />
      
      <style>{`
        body, * { cursor: none !important; }
        a, button { cursor: none !important; }
      `}</style>
    </>
  );
};

export default Cursor;