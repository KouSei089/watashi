import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RIPPLE_ANIMATION_DURATION = 4.0;
const NUM_RIPPLES = 4;
const IMAGE_URL = "https://github.com/KouSei089/watashi/assets/77420123/d32f15ff-a725-40a4-b58f-8c79d67f8eb6";

const Top: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [showBtnCircle, setShowBtnCircle] = useState(false);

  useEffect(() => {
    if (hovered) {
      setShowBtnCircle(true);
    } else {
      setTimeout(() => setShowBtnCircle(false), 500);
    }
  }, [hovered]);

  const noiseSvg = encodeURIComponent(`
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/></filter>
      <rect width="100" height="100" filter="url(#n)" opacity="0.4"/>
    </svg>
  `);

  return (
    <motion.div 
      // ページ全体のフェードイン/アウト
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-0 w-full h-full bg-white z-[60] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="flex flex-col items-center w-full max-w-2xl px-8">
        
        {/* メインビジュアル: 少し下から、ゆっくりと浮かび上がる */}
        <motion.div 
          className="w-full mb-20 flex justify-center overflow-hidden"
          initial={{ opacity: 0, y: 20, scale: 1.05 }}
          animate={{ opacity: 0.4, y: 0, scale: 1 }}
          transition={{ duration: 2.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img 
            className="w-full h-auto rounded-sm blur-md grayscale brightness-[1.05] opacity-90 transition-all duration-1000 will-change-transform will-change-filter" 
            src={IMAGE_URL} 
            alt="main" 
          />
        </motion.div>

        {/* ボタンエリア: メインビジュアルの後に静かに現れる */}
        <motion.div 
          className="relative group"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
        >
          <Link 
            to="/watashi/about" 
            className="relative h-20 w-20 flex justify-center items-center no-underline outline-none"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* 中心点 */}
            <div className={`w-1 h-1 rounded-full bg-black transition-all duration-700 ${hovered ? 'scale-[15] opacity-0' : 'opacity-20 scale-100'}`} />

            {/* 波紋 */}
            {!hovered && Array.from({ length: NUM_RIPPLES }).map((_, i) => (
              <span 
                key={i} 
                className="ripple-effect border-[0.2px] border-black absolute" 
                style={{ animationDelay: `${(i * RIPPLE_ANIMATION_DURATION) / NUM_RIPPLES}s` }} 
              />
            ))}

            {/* 外周円 */}
            <div className={`absolute inset-[-10px] rounded-full transition-opacity duration-1000 ${showBtnCircle ? 'opacity-100' : 'opacity-0'}`}>
              <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="48" 
                  fill="transparent" 
                  stroke="black" 
                  strokeWidth="0.2" 
                  strokeDasharray="301.6" 
                  strokeDashoffset={hovered ? "0" : "301.6"}
                  style={{ transition: 'stroke-dashoffset 2.5s cubic-bezier(0.2, 0, 0.2, 1)' }}
                />
              </svg>
            </div>

            {/* ノイズテクスチャ */}
            <div 
              className={`absolute inset-[-10px] rounded-full transition-all duration-[2000ms] overflow-hidden pointer-events-none ${hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
              style={{ 
                backgroundImage: `url("data:image/svg+xml,${noiseSvg}")`, 
                backgroundSize: '150px 150px',
                mixBlendMode: 'multiply'
              }} 
            />
            
            <span className={`absolute text-[8px] tracking-[0.4em] uppercase transition-all duration-1000 pointer-events-none ${hovered ? 'opacity-40 translate-y-0' : 'opacity-0 translate-y-2'}`}>
              Enter
            </span>
          </Link>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .ripple-effect { 
          width: 80px; height: 80px; 
          border-radius: 50%; 
          will-change: transform, opacity;
          animation: ripple-subtle 4.0s infinite linear; 
        }
        @keyframes ripple-subtle { 
          0% { transform: scale3d(0.6, 0.6, 1); opacity: 0; } 
          20% { opacity: 0.15; }
          100% { transform: scale3d(1.8, 1.8, 1); opacity: 0; } 
        }
      `}} />
    </motion.div>
  );
};

export default Top;