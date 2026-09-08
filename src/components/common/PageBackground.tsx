import React from 'react';
import { useReducedMotion } from 'framer-motion';
import { Palette, blobLayout } from '../../data/palettes';

/**
 * ページの背景。
 *
 * 大きくぼかした色の面を 4 枚重ね、それぞれ別の道筋でゆっくり漂わせる。
 *
 * 一度 canvas でノイズを描き、高さの場から法線を求めて光を当てる作りも
 * 試したが、艶のある大理石のような質感になってしまった。
 * マットで優しい面という、このサイトの持ち味とは正反対だった。
 * 参考サイトの contact に寄せすぎたための失敗で、
 * 面そのものはぼかした色のままにして、動きだけを作り込むのが正しかった。
 *
 * 4 枚はそれぞれ別の keyframes を持つ。同じ動きを時間差で流すと、
 * ずれていても「同じ形が繰り返し通る」ことが見えてしまう。
 *
 * 画面に固定する。ページによって高さがまるで違うため、
 * ページの高さに合わせて伸ばすと色の広がり方がばらつく。
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
          className={`soft-blob${reduceMotion ? '' : ` soft-blob--${i}`}`}
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            background: `radial-gradient(circle at 50% 50%, ${palette[i]} 0%, ${palette[i]}00 70%)`,
          }}
        />
      ))}

      {/* 粒子。のっぺりした面に紙のざらつきを足す */}
      <span className="absolute inset-0 page-grain" />
    </div>
  );
};

export default PageBackground;
