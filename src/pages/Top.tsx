import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const CIRCLE_ANIMATION_DURATION = 2200;
const RIPPLE_ANIMATION_DURATION = 5.5;
const NUM_RIPPLES = 7;
const IMAGE_URL = "https://github.com/KouSei089/watashi/assets/77420123/d32f15ff-a725-40a4-b58f-8c79d67f8eb6";

const Top: React.FC = () => {
  const history = useHistory();
  const [hovered, setHovered] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showBtnCircle, setShowBtnCircle] = useState(false);
  const [dotVisible, setDotVisible] = useState(false);
  const [dotOpacity, setDotOpacity] = useState(0);
  const [reverse, setReverse] = useState(false);

  const dotTimeout = useRef<NodeJS.Timeout | null>(null);
  const dotHideTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (hovered) {
      setShowBtnCircle(true);
      dotTimeout.current = setTimeout(() => {
        setDotVisible(true);
        setTimeout(() => setDotOpacity(1), 30);
      }, CIRCLE_ANIMATION_DURATION);
    } else {
      setDotOpacity(0);
      dotHideTimeout.current = setTimeout(() => setDotVisible(false), 1200);
      if (dotTimeout.current) clearTimeout(dotTimeout.current);
      setTimeout(() => setShowBtnCircle(false), 350);
    }
    return () => {
      if (dotTimeout.current) clearTimeout(dotTimeout.current);
      if (dotHideTimeout.current) clearTimeout(dotHideTimeout.current);
    };
  }, [hovered]);

  useEffect(() => {
    if (!hovered && reverse) {
      const timer = setTimeout(() => setReverse(false), CIRCLE_ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [hovered, reverse]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setFadeOut(true);
    setTimeout(() => {
      history.push('/watashi/about');
    }, 1600);
  };

  const noiseSvg = encodeURIComponent(`
    <svg width="74" height="74" xmlns="http://www.w3.org/2000/svg">
      <filter id="noise" x="0" y="0">
        <feTurbulence type="fractalNoise" baseFrequency="1.7" numOctaves="6" seed="7" />
      </filter>
      <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
      <circle cx="37" cy="37" r="37" fill="#222" filter="url(%23noise) url(%23blur)" opacity="0.92"/>
    </svg>
  `);

  return (
    <div className={`min-h-screen bg-white transition-all duration-[1600ms] ease-[cubic-bezier(.4,2,.3,1)] ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      <main className="flex flex-col items-center pt-24 pb-12 font-jp">
        
        {/* 画像エリア */}
        <div className="px-6 md:px-72 flex justify-center relative w-full max-w-7xl mx-auto">
          <img
            className="w-full max-w-3xl h-auto object-cover rounded shadow-[0_4px_24px_0_rgba(0,0,0,0.06)] select-none pointer-events-auto"
            src={IMAGE_URL}
            alt="main-img"
            style={{ filter: 'blur(8px) brightness(0.95) contrast(1.05)' }}
            draggable={false}
          />
        </div>

        {/* インタラクティブボタン */}
        <div className="flex flex-col items-center -mt-8">
          <Link
            to="/watashi/about"
            className="relative h-[110px] w-[110px] flex justify-center items-center no-underline cursor-pointer bg-transparent"
            onMouseEnter={() => { setHovered(true); setReverse(false); }}
            onMouseLeave={() => { setHovered(false); setReverse(true); }}
            onClick={handleClick}
          >
            {/* 波紋 */}
            {!hovered && Array.from({ length: NUM_RIPPLES }).map((_, i) => (
              <span
                key={i}
                className="ripple-effect border-[0.3px] border-black"
                style={{ animationDelay: `${(i * RIPPLE_ANIMATION_DURATION) / NUM_RIPPLES}s` }}
              />
            ))}

            {/* アニメーションサークル */}
            <span
              className={`absolute top-[55px] left-1/2 rounded-full z-10 transition-all duration-700 ease-[cubic-bezier(.4,2,.3,1)] flex items-center justify-center overflow-hidden
                ${showBtnCircle ? "opacity-100" : "opacity-0"}
                ${hovered ? "w-[74px] h-[74px] -ml-[37px] -mt-[37px]" : "w-[54px] h-[54px] -ml-[27px] -mt-[27px]"}
              `}
            >
              {/* 線のアニメーション */}
              {showBtnCircle && (
                <svg
                  className={`absolute top-0 left-0 rotate-45 transition-all duration-700
                    ${hovered ? "w-[74px] h-[74px] circle-anim-hide" : "w-[54px] h-[54px]"}
                    ${reverse ? "circle-anim-reverse" : ""}
                  `}
                  viewBox={`0 0 ${hovered ? 74 : 54} ${hovered ? 74 : 54}`}
                >
                  <circle
                    cx={hovered ? 37 : 27}
                    cy={hovered ? 37 : 27}
                    r={hovered ? 35 : 25}
                    fill="transparent"
                    stroke="#222"
                    strokeWidth="0.3"
                    strokeDasharray={hovered ? 219.8 : 157}
                    strokeDashoffset={reverse ? (hovered ? 219.8 : 157) : 0}
                  />
                </svg>
              )}

              {/* ノイズ背景とアイコン */}
              {dotVisible && (
                <>
                  <span
                    className="absolute inset-0 rounded-full transition-opacity duration-[2800ms]"
                    style={{ 
                      backgroundImage: `url("data:image/svg+xml,${noiseSvg}")`,
                      backgroundSize: 'cover',
                      opacity: dotOpacity 
                    }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-[1200ms]" style={{ opacity: dotOpacity }}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M14 8v12m0 0l-6-6m6 6l6-6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </>
              )}
            </span>

            {/* ヒットエリア拡大用 */}
            <span className="absolute top-[55px] left-1/2 w-[74px] h-[74px] -ml-[37px] -mt-[37px] rounded-full bg-transparent z-0" />
          </Link>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .ripple-effect {
          position: absolute;
          left: 50%;
          top: 55px;
          width: 54px;
          height: 54px;
          margin-left: -27px;
          margin-top: -27px;
          border-radius: 50%;
          opacity: 0.18;
          animation: ripple-appear 5.5s cubic-bezier(.4,2,.3,1) infinite;
        }
        @keyframes ripple-appear {
          0% { transform: scale(1); opacity: 0.18; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        .circle-anim-hide circle {
          animation: eraseAndRotate 2.2s cubic-bezier(.4,2,.3,1) forwards;
          transform-origin: center;
        }
        .circle-anim-reverse circle {
          animation: drawAndRotate 2.2s cubic-bezier(.4,2,.3,1) forwards;
          transform-origin: center;
        }
        @keyframes eraseAndRotate {
          from { stroke-dashoffset: 0; transform: rotate(0deg); }
          to { stroke-dashoffset: 157; transform: rotate(360deg); }
        }
        @keyframes drawAndRotate {
          from { stroke-dashoffset: 157; transform: rotate(360deg); }
          to { stroke-dashoffset: 0; transform: rotate(0deg); }
        }
      `}} />
    </div>
  );
};

export default Top;