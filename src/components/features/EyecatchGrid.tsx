import React from 'react';
import { eyecatchData } from '../../data/eyecatchData';
import SectionHeader from '../common/SectionHeader';

const EyecatchGrid: React.FC = () => {
  const allItems = React.useMemo(
    () => [...eyecatchData].sort((a, b) => b.created_at.localeCompare(a.created_at)),
    []
  );

  return (
    <section className="w-full bg-paper font-jp overflow-hidden">
      <div className="px-6 md:px-12 pt-24 pb-14">
        <SectionHeader
          id="book-diary"
          index="03"
          label="Diary"
          note={
            <>
              <p className="m-0 mb-1">日々の読書を記録しています。</p>
              <p className="m-0">ここに並ぶのは、わたしの思考や感性をかたちづくってきた本たちの記録です。</p>
            </>
          }
        >
          読書の日記
        </SectionHeader>

        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 mt-10">
          <div className="lg:col-span-2" />
          <div className="lg:col-span-10 marginalia">{allItems.length} Entries</div>
        </div>
      </div>

      {/*
        JSによる制御は入れず単純なCSSグリッドのまま。
        描画の間引きは .diary-cell（index.css）に寄せている。
        列ごとのパララックスは、格子の罫線が崩れるうえに
        時系列の並び（行方向）が読めなくなるため採らなかった。
      */}
      <div className="w-full grid grid-cols-5 md:grid-cols-10 gap-0 border-t border-ink/10 border-l">
        {allItems.map((item) => (
          <a
            key={item.noteUrl}
            href={item.noteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="diary-cell group relative aspect-[4/3] overflow-hidden bg-paper border-r border-b border-ink/10 block"
          >
            <img
              src={item.eyecatch}
              alt={item.name}
              className="w-full h-full object-cover transition-all duration-700 ease-out opacity-90 sm:group-hover:opacity-100 sm:group-hover:scale-105 will-change-transform"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-ink/70 flex flex-col justify-end p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[6px] text-white/50 mb-0.5">{item.created_at}</span>
              <span className="text-[7px] text-white truncate leading-tight">{item.name}</span>
            </div>
          </a>
        ))}
      </div>

      <div className="w-full py-28 flex flex-col items-center justify-center">
        <div className="w-px h-10 bg-ink/10 mb-6" />
        <span className="marginalia">Fin.</span>
      </div>
    </section>
  );
};

export default EyecatchGrid;
