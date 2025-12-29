import React, { useState } from 'react';
import { eyecatchData } from '../../data/eyecatchData';
import { BookItem } from '../../types';

// グルーピング用の型
interface GroupedYear {
  year: string;
  items: BookItem[];
}

// 補助関数: 年ごとにグループ化
const groupByYear = (data: BookItem[]): GroupedYear[] => {
  const grouped: { [key: string]: BookItem[] } = {};
  data.forEach(item => {
    const year = item.created_at.slice(0, 4);
    if (!grouped[year]) grouped[year] = [];
    grouped[year].push(item);
  });
  return Object.entries(grouped)
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([year, items]) => ({
      year,
      items: items.sort((a, b) => b.created_at.localeCompare(a.created_at)),
    }));
};

const INITIAL_COUNT = 12;
const LOAD_MORE_COUNT = 8;

const EyecatchGrid: React.FC = () => {
  const grouped = groupByYear(eyecatchData);

  const [visibleCount, setVisibleCount] = useState<Record<string, number>>(
    Object.fromEntries(grouped.map(({ year }) => [year, INITIAL_COUNT]))
  );

  const [loadMoreInfo, setLoadMoreInfo] = useState<Record<string, { from: number; to: number }>>({});

  const handleLoadMore = () => {
    const nextCounts: Record<string, number> = {};
    const nextInfo: Record<string, { from: number; to: number }> = {};

    grouped.forEach(({ year, items }) => {
      const prevCount = visibleCount[year] ?? INITIAL_COUNT;
      const newCount = Math.min(prevCount + LOAD_MORE_COUNT, items.length);
      nextCounts[year] = newCount;
      nextInfo[year] = { from: prevCount, to: newCount };
    });

    setVisibleCount(nextCounts);
    setLoadMoreInfo(nextInfo);
  };

  const hasMore = grouped.some(
    ({ year, items }) => (visibleCount[year] ?? INITIAL_COUNT) < items.length
  );

  return (
    <section className="w-full bg-white py-12 font-jp">
      {/* アンカーリンク用余白 */}
      <div id="book-diary" className="h-20 -mt-20" />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 mb-10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-matte tracking-wider mb-6">
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

      <div className="w-full grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-px border-y border-gray-100 bg-gray-100">
        {grouped.flatMap(({ year, items }) => {
          const count = visibleCount[year] ?? INITIAL_COUNT;
          return items.slice(0, count).map((item, idx) => {
            const isNew = loadMoreInfo[year] && idx >= loadMoreInfo[year].from;
            const delay = isNew ? (idx - loadMoreInfo[year].from) * 100 : 0;

            return (
              <a
                key={item.noteUrl}
                href={item.noteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative aspect-[4/3] overflow-hidden bg-white transition-opacity duration-700 ${isNew ? 'animate-fadeInUp' : ''}`}
                style={{ animationDelay: `${delay}ms` }}
              >
                <img
                  src={item.eyecatch}
                  alt={item.name}
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col justify-end p-2 opacity-0 group-hover:opacity-100">
                  <span className="text-[10px] text-gray-300">{item.created_at}</span>
                  <span className="text-[11px] text-white truncate">{item.name}</span>
                </div>
              </a>
            );
          });
        })}

        {hasMore && (
          <button
            onClick={handleLoadMore}
            className="col-span-1 aspect-[4/3] flex flex-col items-center justify-center bg-white text-[10px] md:text-xs text-gray-400 hover:text-black transition-colors group"
          >
            <span className="wavy-underline flex items-center gap-1">
              <svg width="12" height="12" fill="none" viewBox="0 0 20 20" className="stroke-current">
                <path d="M10 4v8m0 0l-3-3m3 3l3-3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              MORE
            </span>
          </button>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease forwards;
        }
      `}} />
    </section>
  );
};

export default EyecatchGrid;