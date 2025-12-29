import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const CIRCLE_ANIMATION_DURATION = 1800;
const RIPPLE_ANIMATION_DURATION = 4.0;
const NUM_RIPPLES = 4; // 数を絞って密度を下げる
const IMAGE_URL = "https://github.com/KouSei089/watashi/assets/77420123/d32f15ff-a725-40a4-b58f-8c79d67f8eb6";

const Top: React.FC = () => {
  const history = useHistory();
  const [hovered, setHovered] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showBtnCircle, setShowBtnCircle] = useState(false);
  const [dotVisible, setDotVisible] = useState(false);
  const [dotOpacity, setDotOpacity] = useState(0);

  const dotTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (hovered) {
      setShowBtnCircle(true);
      dotTimeout.current = setTimeout(() => {
        setDotVisible(true);
        setTimeout(() => setDotOpacity(1), 50);
      }, 400); // 描画開始を早める
    } else {
      setDotOpacity(0);
      setTimeout(() => {
        setDotVisible(false);
        setShowBtnCircle(false);
      }, 500);
      if (dotTimeout.current) clearTimeout(dotTimeout.current);
    }
    return () => {
      if (dotTimeout.current) clearTimeout(dotTimeout.current);
    };
  }, [hovered]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setFadeOut(true);
    setTimeout(() => history.push('/watashi/about'), 1600);
  };

  const noiseSvg = encodeURIComponent(`
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/></filter>
      <rect width="100" height="100" filter="url(#n)" opacity="0.4"/>
    </svg>
  `);

  return (
    <div className={`fixed inset-0 w-full h-full bg-white z-[60] transition-opacity duration-[1600ms] flex flex-col items-center justify-center ${fadeOut ? "opacity-0" : "opacity-100"}`}>
      <div className="flex flex-col items-center w-full max-w-2xl px-8">
        {/* メインビジュアル: より淡く、空間に溶け込むように */}
        <div className="w-full mb-20 flex justify-center overflow-hidden">
          <img 
            className="w-full h-auto rounded-sm blur-[10px] grayscale brightness-[1.02] opacity-40 transition-all duration-1000" 
            src={IMAGE_URL} 
            alt="main" 
          />
        </div>

        {/* ボタンエリア */}
        <div className="relative group">
          <Link 
            to="/watashi/about" 
            className="relative h-20 w-20 flex justify-center items-center no-underline outline-none"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleClick}
          >
            {/* 1. 中心点（核）: 常に静かに光る */}
            <div className={`w-1 h-1 rounded-full bg-black transition-all duration-700 ${hovered ? 'scale-[15] opacity-0' : 'opacity-20 scale-100'}`} />

            {/* 2. 環境波紋（待機時）: 非常に薄い線 */}
            {!hovered && Array.from({ length: NUM_RIPPLES }).map((_, i) => (
              <span 
                key={i} 
                className="ripple-effect border-[0.2px] border-black absolute" 
                style={{ animationDelay: `${(i * RIPPLE_ANIMATION_DURATION) / NUM_RIPPLES}s` }} 
              />
            ))}

            {/* 3. ホバー時の外周円（ローディング感） */}
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

            {/* 4. ノイズテクスチャの広がり */}
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
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .ripple-effect { 
          width: 80px; height: 80px; 
          border-radius: 50%; 
          animation: ripple-subtle 4.0s infinite linear; 
        }
        @keyframes ripple-subtle { 
          0% { transform: scale(0.6); opacity: 0; } 
          20% { opacity: 0.15; }
          100% { transform: scale(1.8); opacity: 0; } 
        }
      `}} />
    </div>
  );
};

export default Top;