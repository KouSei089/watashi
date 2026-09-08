import React from 'react';
import { useReducedMotion } from 'framer-motion';
import { Palette, blobLayout } from '../../data/palettes';

/**
 * ページの背景。
 *
 * 参考にした andmade.jp/about は canvas 2 枚で描いているが、
 * このサイトの構成に WebGL を持ち込むのは重すぎるので、
 * 大きくぼかした径方向グラデーションを重ねて同じ効果を作る。
 *
 * 画面に固定する。ページによって高さがまるで違う（わたし 1 画面、
 * これまでのわたしは数画面）ので、ページの高さに合わせて伸ばすと
 * 色の広がり方がページごとにばらつく。
 */
const PageBackground: React.FC<{ palette: Palette }> = ({ palette }) => {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
      style={{
        // 下端は紙の色へ抜く。境目を作らずに本文へ渡す。
        maskImage: 'linear-gradient(to bottom, black 0%, black 68%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 68%, transparent 100%)',
      }}
    >
      {blobLayout.map((blob, i) => (
        <span
          key={blob.left + blob.top}
          className={reduceMotion ? 'opening-blob' : 'opening-blob opening-blob--drift'}
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            background: `radial-gradient(circle at 50% 50%, ${palette[i]} 0%, ${palette[i]}00 70%)`,
            animationDuration: blob.duration,
            animationDelay: blob.delay,
          }}
        />
      ))}

      {/* 粒子。のっぺりしたグラデーションに紙のざらつきを足す */}
      <span className="absolute inset-0 page-grain" />
    </div>
  );
};

export default PageBackground;
