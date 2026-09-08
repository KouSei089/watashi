import React from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { eyecatchData } from '../../data/eyecatchData';
import SectionTitle from '../common/SectionTitle';

/** これ以上速く回しても傾きは増えない（px/秒） */
const VELOCITY_CAP = 2500;
// 1.2 度では効いているかどうか判別できなかったので、
// 意図した演出だと読み取れる程度まで上げている。
const MAX_SKEW_DEG = 2.2;

const EyecatchGrid: React.FC = () => {
  const reduceMotion = useReducedMotion();

  const allItems = React.useMemo(
    () => [...eyecatchData].sort((a, b) => b.created_at.localeCompare(a.created_at)),
    []
  );

  // スクロールの速さに応じて格子をわずかに傾ける。
  // 速く回すと流れ、止まると整列する。静けさは壊さずに手応えだけ出す。
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { stiffness: 200, damping: 50, restDelta: 0.5 });
  const skew = useTransform(
    smoothVelocity,
    [-VELOCITY_CAP, 0, VELOCITY_CAP],
    [MAX_SKEW_DEG, 0, -MAX_SKEW_DEG],
    { clamp: true }
  );

  return (
    <section className="w-full bg-white pt-24 font-jp overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 mb-16">
        <SectionTitle id="book-diary" className="mb-8">読書の日記</SectionTitle>
        <div className="max-w-2xl text-[11px] sm:text-sm text-gray-500 leading-relaxed tracking-wider text-left">
          <p className="mb-2 italic">日々の読書を記録しています。</p>
          <p>ここに並ぶのは、わたしの思考や感性をかたちづくってきた本たちの記録です。</p>
        </div>
      </div>

      {/*
        JSによる制御は入れず単純なCSSグリッドのまま。
        content-visibility を各要素にかけて、画面に入ったぶんだけ描画させる。
        列ごとのパララックスは、格子の罫線が崩れるうえに
        時系列の並び（行方向）が読めなくなるため採らなかった。
      */}
      <motion.div
        className="w-full grid grid-cols-5 md:grid-cols-10 gap-0 border-t border-gray-100 bg-white border-l"
        style={reduceMotion ? undefined : { skewY: skew }}
      >
        {allItems.map((item) => (
          <a
            key={item.noteUrl}
            href={item.noteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-[4/3] overflow-hidden bg-white border-r border-b border-gray-100 block"
            style={{ contentVisibility: 'auto', containIntrinsicSize: '200px 150px' } as React.CSSProperties}
          >
            <img
              src={item.eyecatch}
              alt={item.name}
              className="w-full h-full object-cover transition-all duration-700 ease-out opacity-90 sm:group-hover:opacity-100 sm:group-hover:scale-105 will-change-transform"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[6px] text-gray-400 mb-0.5">{item.created_at}</span>
              <span className="text-[7px] text-white truncate font-light leading-tight">{item.name}</span>
            </div>
          </a>
        ))}
      </motion.div>

      <div className="w-full py-32 flex flex-col items-center justify-center bg-white">
        <div className="w-px h-12 bg-gray-100 mb-8" />
        <span className="text-[10px] tracking-[0.6em] text-gray-300 uppercase italic">Fin.</span>
      </div>
    </section>
  );
};

export default EyecatchGrid;
