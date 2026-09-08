import React from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * 冒頭の背景。
 *
 * 参考にした andmade.jp/about は canvas 2 枚で描いているが、
 * このサイトの構成に WebGL を持ち込むのは重すぎるので、
 * 大きくぼかした径方向グラデーションを重ねて同じ効果を作る。
 *
 * 色は写真から取っている（海、対岸の山、室内の木）。
 * 参考サイトほど彩度は上げない。紙面が #F6F6F4 の静かな面なので、
 * 強い色を置くと本文が負ける。下端に向けて紙の色へ溶かしている。
 */

interface Blob {
  color: string;
  size: string;
  top: string;
  left: string;
  duration: string;
  delay: string;
}

const blobs: Blob[] = [
  { color: '#8CB4C1', size: '56vw', top: '-14%', left: '-10%', duration: '34s', delay: '0s' },  // 海
  { color: '#B4C9A8', size: '50vw', top: '2%', left: '36%', duration: '41s', delay: '-6s' },    // 対岸の山
  { color: '#E2C9A0', size: '48vw', top: '26%', left: '60%', duration: '37s', delay: '-14s' },  // 室内の木
  { color: '#ADA7C6', size: '42vw', top: '36%', left: '8%', duration: '46s', delay: '-22s' },   // 影
];

const NOISE = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">
    <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter>
    <rect width="120" height="120" filter="url(#n)" opacity="0.5"/>
  </svg>
`);

const OpeningBackground: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
      style={{
        // 下端は紙の色へ抜く。境目を作らずに本文へ渡す。
        maskImage: 'linear-gradient(to bottom, black 0%, black 68%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 68%, transparent 100%)',
      }}
    >
      {blobs.map((blob) => (
        <span
          key={blob.color}
          className={reduceMotion ? 'opening-blob' : 'opening-blob opening-blob--drift'}
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            background: `radial-gradient(circle at 50% 50%, ${blob.color} 0%, ${blob.color}00 70%)`,
            animationDuration: blob.duration,
            animationDelay: blob.delay,
          }}
        />
      ))}

      {/* 粒子。のっぺりしたグラデーションに紙のざらつきを足す */}
      <span
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,${NOISE}")`,
          backgroundSize: '160px 160px',
          opacity: 0.35,
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  );
};

export default OpeningBackground;
