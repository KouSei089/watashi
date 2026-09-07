import React from 'react';
import { eyecatchData } from '../../data/eyecatchData';

const EyecatchGrid: React.FC = () => {
  const allItems = React.useMemo(() => {
    return Array.isArray(eyecatchData) 
      ? [...eyecatchData].sort((a, b) => b.created_at.localeCompare(a.created_at))
      : [];
  }, []);

  return (
    <section id="book-diary" className="w-full bg-white pt-24 font-jp overflow-hidden scroll-mt-24">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 mb-16">
        <h2 className="text-4xl sm:text-5xl md:text-7xl text-matte tracking-widest mb-8">
          読書の日記
        </h2>
        <div className="max-w-2xl text-[11px] sm:text-sm text-gray-500 leading-relaxed tracking-wider text-left">
          <p className="mb-2 italic">日々の読書を記録しています。</p>
          <p>ここに並ぶのは、わたしの思考や感性をかたちづくってきた本たちの記録です。</p>
        </div>
      </div>

      {/* 
        解決策：JSによる制御を排除し、単純なCSSグリッドにする。
        「content-visibility: auto」をコンテナ単位ではなく各要素単位でかけることで、
        画面に入った少しの要素だけを都度レンダリングさせ、負荷スパイクを防ぎます。
      */}
      <div 
        className="w-full grid grid-cols-5 md:grid-cols-10 gap-0 border-t border-gray-100 bg-white border-l"
      >
        {allItems.map((item) => (
          <a
            key={item.noteUrl}
            href={item.noteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-[4/3] overflow-hidden bg-white border-r border-b border-gray-100 block"
            style={{ contentVisibility: 'auto', containIntrinsicSize: '200px 150px' } as any}
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
      </div>

      <div className="w-full py-32 flex flex-col items-center justify-center bg-white">
        <div className="w-px h-12 bg-gray-100 mb-8" />
        <span className="text-[10px] tracking-[0.6em] text-gray-300 uppercase italic">Fin.</span>
      </div>
    </section>
  );
};

export default EyecatchGrid;