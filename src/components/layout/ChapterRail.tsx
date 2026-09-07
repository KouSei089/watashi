import React, { useEffect, useState } from 'react';
import { useScrollTo, useLenis } from '../../lib/lenis';

const chapters = [
  { id: 'profile', label: 'わたし' },
  { id: 'history', label: 'これまでのわたし' },
  { id: 'book-diary', label: '読書の日記' },
];

/**
 * 右端の章立てインジケータ。
 *
 * 上部 1px の進捗バーは「どこまで来たか」しか示せなかったので、
 * 「いまどの章か」を示す縦の目盛りに置き換えた。本のノンブルに近い。
 */
const ChapterRail: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const scrollTo = useScrollTo();
  const lenis = useLenis();

  useEffect(() => {
    const update = () => {
      // 画面の高さの 45% あたりを「いま読んでいる行」とみなす
      const line = window.innerHeight * 0.45;
      let current: string | null = null;
      chapters.forEach((chapter) => {
        const el = document.getElementById(chapter.id);
        if (el && el.getBoundingClientRect().top <= line) current = chapter.id;
      });
      setActiveId(current);
    };

    update();

    // Lenis が動いているならその scroll イベントに相乗りする。
    // 生の window スクロールを別で購読すると二重に走る。
    if (lenis) {
      lenis.on('scroll', update);
      return () => lenis.off('scroll', update);
    }
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [lenis]);

  return (
    <nav
      aria-label="章"
      className={`hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-[95] flex-col gap-5 transition-opacity duration-700 ${
        activeId ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {chapters.map((chapter) => {
        const isActive = activeId === chapter.id;
        return (
          <button
            key={chapter.id}
            type="button"
            onClick={() => scrollTo(`#${chapter.id}`)}
            className="group flex items-center justify-end gap-3 bg-transparent border-0 p-0 outline-none"
            aria-current={isActive ? 'true' : undefined}
          >
            <span
              className={`text-[10px] tracking-[0.2em] whitespace-nowrap transition-all duration-500 ${
                isActive
                  ? 'opacity-50 text-black'
                  : 'opacity-0 group-hover:opacity-40 text-gray-500 translate-x-1 group-hover:translate-x-0'
              }`}
            >
              {chapter.label}
            </span>
            <span
              className={`block h-px transition-all duration-500 ${
                isActive ? 'w-8 bg-black opacity-60' : 'w-4 bg-black opacity-20 group-hover:w-6'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
};

export default ChapterRail;
