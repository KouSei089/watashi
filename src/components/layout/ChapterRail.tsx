import React, { useEffect, useState } from 'react';
import { useScrollTo, useLenis } from '../../lib/lenis';

const chapters = [
  { id: 'profile', index: '01', label: 'わたし' },
  { id: 'history', index: '02', label: 'これまでのわたし' },
  { id: 'book-diary', index: '03', label: '読書の日記' },
];

/**
 * 右端の章立てインジケータ。
 *
 * 上部 1px の進捗バーは「どこまで来たか」しか示せなかったので、
 * 「いまどの章か」を示す縦の目盛りに置き換えた。本のノンブルに近い。
 *
 * 章の中の進み具合も目盛りの長さで示す。
 * 年表は pin で数画面ぶん留まるため、これが無いと
 * 進んでいるのかどうかの手がかりが無くなる。
 */
const ChapterRail: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [chapterProgress, setChapterProgress] = useState(0);
  const scrollTo = useScrollTo();
  const lenis = useLenis();

  useEffect(() => {
    const update = () => {
      // 画面の高さの 45% あたりを「いま読んでいる行」とみなす
      const line = window.innerHeight * 0.45;
      const tops = chapters.map((chapter) => {
        const el = document.getElementById(chapter.id);
        return el ? el.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
      });

      let current: number | null = null;
      tops.forEach((top, i) => {
        if (top <= line) current = i;
      });
      setActiveIndex(current);

      if (current === null) {
        setChapterProgress(0);
        return;
      }

      // その章の始まりから、次の章の始まりまでを 0..1 で表す。
      // 最後の章は文書の終わりまでを終点にする。
      const start = tops[current];
      const end =
        current + 1 < tops.length
          ? tops[current + 1]
          : document.body.scrollHeight - window.scrollY;
      const span = end - start;
      setChapterProgress(span > 0 ? Math.min(1, Math.max(0, (line - start) / span)) : 0);
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
      className={`fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[95] flex flex-col gap-4 md:gap-5 transition-opacity duration-700 ${
        activeIndex === null ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {chapters.map((chapter, i) => {
        const isActive = activeIndex === i;
        return (
          <button
            key={chapter.id}
            type="button"
            onClick={() => scrollTo(`#${chapter.id}`)}
            className="group flex items-center justify-end gap-3 bg-transparent border-0 p-0 outline-none"
            aria-current={isActive ? 'true' : undefined}
            aria-label={chapter.label}
          >
            {/* ラベルはデスクトップのみ。狭い画面では点だけにする */}
            <span
              className={`hidden md:flex items-baseline gap-2 text-[10px] tracking-[0.18em] whitespace-nowrap transition-all duration-500 ${
                isActive
                  ? 'opacity-100 text-ink/60'
                  : 'opacity-0 group-hover:opacity-50 text-ink/50 translate-x-1 group-hover:translate-x-0'
              }`}
            >
              <span className="tabular-nums">({chapter.index})</span>
              {chapter.label}
            </span>

            {/* 目盛り。現在の章は、章の中の進み具合ぶんだけ伸びる */}
            <span className="relative block h-px w-2 md:w-8 bg-ink/20 overflow-hidden">
              <span
                className="absolute inset-y-0 left-0 bg-ink/70 transition-[width] duration-150 ease-out"
                style={{ width: isActive ? `${chapterProgress * 100}%` : '0%' }}
              />
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default ChapterRail;
