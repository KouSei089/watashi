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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setFadeOut(true);
    setTimeout(() => history.push('/watashi/about'), 1600);
  };

  const noiseSvg = encodeURIComponent(`
    <svg width="74" height="74" xmlns="http://www.w3.org/2000/svg">
      <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="1.7" numOctaves="6" seed="7"/></filter>
      <filter id="blur"><feGaussianBlur stdDeviation="3"/></filter>
      <circle cx="37" cy="37" r="37" fill="#222" filter="url(%23noise) url(%23blur)" opacity="0.92"/>
    </svg>
  `);

  return (
    <div className={`min-h-screen bg-white transition-opacity duration-[1600ms] ${fadeOut ? "opacity-0" : "opacity-100"}`}>
      <main className="flex flex-col items-center pt-24">
        <div className="px-6 md:px-72 flex justify-center w-full max-w-7xl mx-auto">
          <img className="w-full max-w-3xl rounded shadow-lg blur-[8px] brightness-95" src={IMAGE_URL} alt="main" />
        </div>
        <div className="flex flex-col items-center -mt-8">
          <Link to="/watashi/about" className="relative h-[110px] w-[110px] flex justify-center items-center no-underline"
            onMouseEnter={() => { setHovered(true); setReverse(false); }}
            onMouseLeave={() => { setHovered(false); setReverse(true); }}
            onClick={handleClick}>
            {!hovered && Array.from({ length: NUM_RIPPLES }).map((_, i) => (
              <span key={i} className="ripple-effect border-[0.3px] border-black" 
                style={{ animationDelay: `${(i * RIPPLE_ANIMATION_DURATION) / NUM_RIPPLES}s` }} />
            ))}
            <span className={`absolute rounded-full transition-all duration-700 flex items-center justify-center overflow-hidden
              ${showBtnCircle ? "opacity-100" : "opacity-0"}
              ${hovered ? "w-[74px] h-[74px]" : "w-[54px] h-[54px]"} `}>
              {showBtnCircle && (
                <svg className={`absolute rotate-45 transition-all duration-700 ${hovered ? "w-[74px] h-[74px] circle-anim-hide" : "w-[54px] h-[54px]"} ${reverse ? "circle-anim-reverse" : ""}`} viewBox={`0 0 ${hovered ? 74 : 54} ${hovered ? 74 : 54}`}>
                  <circle cx={hovered ? 37 : 27} cy={hovered ? 37 : 27} r={hovered ? 35 : 25} fill="transparent" stroke="#222" strokeWidth="0.3" 
                    strokeDasharray={hovered ? 219.8 : 157} strokeDashoffset={reverse ? (hovered ? 219.8 : 157) : 0} />
                </svg>
              )}
              {dotVisible && (
                <span className="absolute inset-0 transition-opacity duration-[2800ms]" style={{ backgroundImage: `url("data:image/svg+xml,${noiseSvg}")`, backgroundSize: 'cover', opacity: dotOpacity }} />
              )}
            </span>
          </Link>
        </div>
      </main>
      <style dangerouslySetInnerHTML={{ __html: `
        .ripple-effect { position: absolute; border-radius: 50%; animation: ripple-appear 5.5s infinite; }
        @keyframes ripple-appear { 0% { transform: scale(1); opacity: 0.18; } 100% { transform: scale(1.7); opacity: 0; } }
        .circle-anim-hide circle { animation: erase 2.2s forwards; transform-origin: center; }
        @keyframes erase { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 157; } }
      `}} />
    </div>
  );
};

export default Top;