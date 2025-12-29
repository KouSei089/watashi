import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { eyecatchData } from '../../data/eyecatchData';
import { BookItem } from '../../types';

const INITIAL_COUNT = 40; // 小さくなる分、最初からある程度の数を表示
const LOAD_MORE_COUNT = 24;

const EyecatchGrid: React.FC = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  
  const allItems = useMemo(() => {
    return Array.isArray(eyecatchData) 
      ? [...eyecatchData].sort((a, b) => b.created_at.localeCompare(a.created_at))
      : [];
  }, []);

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, allItems.length));
  }, [allItems.length]);

  const hasMore = visibleCount < allItems.length;

  useEffect(() => {
    if (!hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) handleLoadMore();
      },
      { rootMargin: '0px 0px 100px 0px' } 
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleLoadMore, hasMore, visibleCount]);

  return (
    <section className="w-full bg-white pt-12 font-jp">
      <div id="book-diary" className="h-20 -mt-20" />

      {/* テキストセクション：他のセクションと揃える */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 mb-10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-matte tracking-wider mb-6 text-left">
          読書の日記
        </h2>
        <div className="max-w-2xl text-xs md:text-sm text-gray-500 leading-relaxed">
          <p>
            日々の読書を記録しています。ときどき、読書とは関係のない日記も書きます。<br />
            日記という形式がすきです。日付という箱にじぶんのすきを並べられるのが心地よいです。<br />
            ここに並ぶのは、わたしの思考や感性をかたちづくってきた本たちの記録です。
          </p>
        </div>
      </div>

      {/* サイズ調整：
        スマホ: grid-cols-5 (非常に小さく緻密に)
        PC: md:grid-cols-8 (アーカイブとしての美しさ)
      */}
      <div className="w-full grid grid-cols-5 md:grid-cols-8 gap-0 border-t border-gray-100 bg-white">
        {allItems.slice(0, visibleCount).map((item) => (
          <a
            key={item.noteUrl}
            href={item.noteUrl}
            target="_blank"
            rel="noopener noreferrer"
            // フェード速度を2000msに維持しつつ、サイズを抑制
            className="group relative aspect-[4/3] overflow-hidden bg-white border-r border-b border-gray-100 transition-opacity duration-[2000ms] ease-in-out"
          >
            <img
              src={item.eyecatch}
              alt={item.name}
              className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms] ease-in-out"
              loading="lazy"
            />
            {/* 文字サイズを極小(text-[7px])にして、繊細なデザインに合わせる */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col justify-end p-1.5 opacity-0 group-hover:opacity-100">
              <span className="text-[7px] text-gray-300 leading-none mb-1">{item.created_at}</span>
              <span className="text-[8px] md:text-[9px] text-white truncate leading-tight">{item.name}</span>
            </div>
          </a>
        ))}
      </div>

      {/* 検知用エリア：ページが伸びる演出のため最小限に */}
      <div ref={loaderRef} className="w-full h-4 bg-white flex items-center justify-center overflow-hidden">
        {hasMore && (
          <div className="flex gap-2 opacity-5 py-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-0.5 h-0.5 rounded-full bg-black animate-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
            ))}
          </div>
        )}
      </div>

      {!hasMore && <div className="h-12 bg-white" />}
    </section>
  );
};

export default EyecatchGrid;