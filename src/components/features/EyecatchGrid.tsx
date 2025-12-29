import React from 'react';
import { motion } from 'framer-motion';
import { eyecatchData } from '../../data/eyecatchData';

const EyecatchGrid: React.FC = () => {
  const allItems = React.useMemo(() => {
    return Array.isArray(eyecatchData) 
      ? [...eyecatchData].sort((a, b) => b.created_at.localeCompare(a.created_at))
      : [];
  }, []);

  return (
    <section className="w-full bg-white pt-24 font-jp overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 mb-16">
        <h2 className="text-4xl sm:text-5xl md:text-7xl text-matte tracking-widest mb-8">
          読書の日記
        </h2>
        <div className="max-w-2xl text-[11px] sm:text-sm text-gray-500 leading-relaxed tracking-wider text-left">
          <p className="mb-2 italic">日々の読書を記録しています。</p>
          <p>ここに並ぶのは、わたしの思考や感性をかたちづくってきた本たちの記録です。</p>
        </div>
      </div>

      {/* 解決策：JSによる制御を排除し、単純なCSSグリッドにする。
        「content-visibility: auto」により、画面外の描画計算をブラウザに完全に任せ、
        スクロールのガタつき（メインスレッドの詰まり）を解消します。
      */}
      <div 
        className="w-full grid grid-cols-5 md:grid-cols-10 gap-0 border-t border-gray-100 bg-white border-l"
        style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' } as any}
      >
        {allItems.map((item) => (
          <a
            key={item.noteUrl}
            href={item.noteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-[4/3] overflow-hidden bg-white border-r border-b border-gray-100 block"
          >
            <img
              src={item.eyecatch}
              alt={item.name}
              className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 sm:group-hover:scale-105 transition-all duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[6px] text-gray-400 mb-0.5">{item.created_at}</span>
              <span className="text-[7px] text-white truncate font-light leading-tight">{item.name}</span>
            </div>
          </a>
        ))}
      </div>

      <div className="w-full py-32 flex flex-col items-center justify-center bg-white">
        <div className="w-px h-12 bg-gray-100 mb-8" />
        <span className="text-[10px] tracking-[0.6em] text-gray-300 uppercase italic">Fin.</span>
      </div>
    </section>
  );
};

export default EyecatchGrid;