// Top.jsx
import { Layout } from 'antd';
import "antd/dist/antd.css";
import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const { Content } = Layout;

const CIRCLE_ANIMATION_DURATION = 2200;
const RIPPLE_ANIMATION_DURATION = 5.5;
const NUM_RIPPLES = 7;

const IMAGE_URL = "https://github.com/KouSei089/watashi/assets/77420123/d32f15ff-a725-40a4-b58f-8c79d67f8eb6";

const Top = () => {
  // --- 既存のボタンアニメーション ---
  const [hovered, setHovered] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showBtnCircle, setShowBtnCircle] = useState(false);
  const [dotVisible, setDotVisible] = useState(false);
  const [dotOpacity, setDotOpacity] = useState(0);
  const [reverse, setReverse] = useState(false);
  const dotTimeout = useRef(null);
  const dotHideTimeout = useRef(null);

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
      clearTimeout(dotTimeout.current);
      setTimeout(() => setShowBtnCircle(false), 350);
    }
    return () => {
      clearTimeout(dotTimeout.current);
      clearTimeout(dotHideTimeout.current);
    };
  }, [hovered]);

  useEffect(() => {
    if (!hovered && reverse) {
      const timer = setTimeout(() => setReverse(false), CIRCLE_ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [hovered, reverse]);

  const handleMouseEnterBtn = () => {
    setHovered(true);
    setReverse(false);
  };
  const handleMouseLeaveBtn = () => {
    setHovered(false);
    setReverse(true);
  };

  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    setFadeOut(true);
    setTimeout(() => {
      history.push('/watashi/about');
    }, 1600);
  };

  // SVGノイズパターン
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

  const ClickIcon = (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      style={{
        display: 'block',
        margin: 0,
        padding: 0,
      }}
      aria-hidden="true"
    >
      <path
        d="M14 8v12m0 0l-6-6m6 6l6-6"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className={`flex items-center transition-fade ${fadeOut ? "fade-out" : ""}`}>
      <Layout>
        <Content className="bg-white font-zen leading-5">
          <div className="px-6 md:px-72 pb-12 flex justify-center mt-24" style={{ position: 'relative' }}>
            {/* 画像本体 */}
            <img
              className="w-full max-w-3xl h-auto object-cover rounded"
              src={IMAGE_URL}
              alt="main-img"
              style={{
                filter: 'blur(8px) brightness(0.95) contrast(1.05)',
                boxShadow: '0 4px 24px 0 rgba(0,0,0,0.06)',
                display: 'block',
                transition: 'none',
                pointerEvents: 'auto',
                userSelect: 'none',
              }}
              draggable={false}
            />
          </div>
          {/* ミニマルなワンラインボタン */}
          <div className="flex flex-col items-center" style={{ marginTop: '-2rem' }}>
            <Link
              to="/watashi/about"
              style={{
                position: 'relative',
                height: 110,
                width: 110,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textDecoration: 'none',
                cursor: 'pointer',
                background: 'transparent',
              }}
              onMouseEnter={handleMouseEnterBtn}
              onMouseLeave={handleMouseLeaveBtn}
              onClick={handleClick}
              aria-label="わたしページへ"
            >
              {/* 波紋エフェクト */}
              {!hovered && (
                <>
                  {Array.from({ length: NUM_RIPPLES }).map((_, i) => (
                    <span
                      key={i}
                      className="ripple-effect"
                      style={{
                        animationDelay: `${(i * RIPPLE_ANIMATION_DURATION) / NUM_RIPPLES}s`,
                        borderWidth: '0.3px',
                      }}
                    />
                  ))}
                </>
              )}
              {/* メインの円 */}
              <span
                className={`circle-fade${showBtnCircle ? " circle-fade-in" : ""}`}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: 55,
                  width: hovered ? 74 : 54,
                  height: hovered ? 74 : 54,
                  marginLeft: hovered ? -37 : -27,
                  marginTop: hovered ? -37 : -27,
                  borderRadius: '50%',
                  zIndex: 3,
                  pointerEvents: 'none',
                  background: 'transparent',
                  opacity: showBtnCircle ? 1 : 0,
                  transition: 'opacity 0.9s cubic-bezier(.4,2,.3,1), width 0.7s cubic-bezier(.4,2,.3,1), height 0.7s cubic-bezier(.4,2,.3,1), margin 0.7s cubic-bezier(.4,2,.3,1)',
                  boxShadow: 'none',
                  border: 'none',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* 円の線（SVG） */}
                {showBtnCircle && (
                  <svg
                    className={
                      hovered
                        ? "circle-anim circle-anim-hide"
                        : reverse
                        ? "circle-anim circle-anim-reverse"
                        : "circle-anim"
                    }
                    width={hovered ? 74 : 54}
                    height={hovered ? 74 : 54}
                    viewBox={`0 0 ${hovered ? 74 : 54} ${hovered ? 74 : 54}`}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      pointerEvents: 'none',
                      zIndex: 2,
                      display: 'block',
                      transform: 'rotate(45deg)',
                      background: 'transparent',
                      transition: 'width 0.7s, height 0.7s',
                    }}
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
                      style={{
                        transition: "stroke 0.3s"
                      }}
                    />
                  </svg>
                )}
                {/* ノイズ黒 */}
                {dotVisible && (
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background: `url("data:image/svg+xml,${noiseSvg}") center/cover no-repeat`,
                      opacity: dotOpacity,
                      transition: 'opacity 2.8s cubic-bezier(.4,2,.3,1)',
                      pointerEvents: 'none',
                    }}
                  />
                )}
                {/* 中央のクリックアイコン */}
                {dotVisible && (
                  <span
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      opacity: dotOpacity,
                      transition: 'opacity 1.2s cubic-bezier(.4,2,.3,1)',
                      pointerEvents: 'none',
                      zIndex: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {ClickIcon}
                  </span>
                )}
              </span>
              {/* クリック範囲を広げるための透明な円 */}
              <span
                style={{
                  display: 'block',
                  width: 74,
                  height: 74,
                  borderRadius: '50%',
                  background: 'transparent',
                  position: 'absolute',
                  left: '50%',
                  top: 55,
                  marginLeft: -37,
                  marginTop: -37,
                  zIndex: 1,
                }}
              />
            </Link>
            <style>{`
              .circle-anim {
                opacity: 1;
                transition: opacity 0.5s cubic-bezier(.4,2,.3,1);
              }
              .circle-anim-hide circle {
                animation:
                  eraseAndRotate 2.2s cubic-bezier(.4,2,.3,1) forwards;
              }
              .circle-anim-reverse circle {
                animation:
                  drawAndRotate 2.2s cubic-bezier(.4,2,.3,1) forwards;
              }
              @keyframes eraseAndRotate {
                from {
                  stroke-dashoffset: 0;
                  transform: rotate(0deg);
                }
                to {
                  stroke-dashoffset: 157;
                  transform: rotate(360deg);
                }
              }
              @keyframes drawAndRotate {
                from {
                  stroke-dashoffset: 157;
                  transform: rotate(360deg);
                }
                to {
                  stroke-dashoffset: 0;
                  transform: rotate(0deg);
                }
              }
              .circle-anim-hide circle,
              .circle-anim-reverse circle {
                transform-origin: 50% 50%;
              }
              .circle-fade {
                opacity: 0;
                transition: opacity 0.9s cubic-bezier(.4,2,.3,1), width 0.7s cubic-bezier(.4,2,.3,1), height 0.7s cubic-bezier(.4,2,.3,1), margin 0.7s cubic-bezier(.4,2,.3,1);
              }
              .circle-fade-in {
                opacity: 1;
              }
              .ripple-effect {
                position: absolute;
                left: 50%;
                top: 55px;
                width: 54px;
                height: 54px;
                margin-left: -27px;
                margin-top: -27px;
                border-radius: 50%;
                border: 0.3px solid #222;
                opacity: 0.18;
                pointer-events: none;
                animation: ripple-appear 5.5s cubic-bezier(.4,2,.3,1) infinite;
                z-index: 0;
                background: transparent;
              }
              @keyframes ripple-appear {
                0% {
                  transform: scale(1);
                  opacity: 0.18;
                }
                70% {
                  opacity: 0.10;
                }
                100% {
                  transform: scale(1.7);
                  opacity: 0;
                  visibility: hidden;
                }
              }
              .transition-fade {
                transition: opacity 1.6s cubic-bezier(.4,2,.3,1);
              }
              .fade-out {
                opacity: 0;
                pointer-events: none;
              }
            `}</style>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default Top;
