import React, { useMemo, useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { eyecatchData } from '../../data/eyecatchData';
import { BookItem } from '../../types';
import SectionHeader from '../common/SectionHeader';

interface Entry extends BookItem {
  /** 索引に出す見出し。「読書日記 ｜ 6/2〜6/8」なら「6/2〜6/8」 */
  title: string;
  /** 種別。読書日記か、それ以外のノートか */
  kind: string;
  year: string;
}

/**
 * 105 件のうち 100 件が「読書日記 ｜ 日付」という同じ形をしている。
 * 見出しに毎回「読書日記 ｜」が並ぶのは冗長なので種別として括り出し、
 * 見出しには日付だけを残す。
 */
const parseEntry = (item: BookItem): Entry => {
  const matched = item.name.match(/^読書日記\s*｜\s*(.+)$/);
  return {
    ...item,
    title: matched ? matched[1] : item.name,
    kind: matched ? '読書日記' : 'ノート',
    year: item.created_at.slice(0, 4),
  };
};

const pad = (n: number) => String(n).padStart(3, '0');

/**
 * 読書の日記。
 *
 * andmade.jp/studies に倣い、一覧を敷き詰めるのではなく
 * 1 件ずつ見せる。左に全件のサムネイルの帯、中央に選ばれた 1 枚、
 * 右に現在地のカウンター。
 *
 * 背景は記事ごとに変えず、ページの色（黄）に固定している。
 * 記事の画像から色を取る作りも試したが、章ごとに色を決める方針に
 * したので、選ぶ記事によって色が動くのはかえって落ち着かない。
 */
const DiaryIndex: React.FC = () => {
  const [index, setIndex] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const entries = useMemo(
    () =>
      [...eyecatchData]
        .sort((a, b) => b.created_at.localeCompare(a.created_at))
        .map(parseEntry),
    []
  );

  const current = entries[index];

  // 選択が変わったら、帯の中のその 1 枚を見える位置へ寄せる
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const active = strip.querySelector<HTMLElement>('[data-active="true"]');
    active?.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [index, reduceMotion]);

  const step = (delta: number) =>
    setIndex((i) => Math.min(entries.length - 1, Math.max(0, i + delta)));

  return (
    <section className="relative w-full font-jp overflow-hidden">
      <div className="relative z-10 px-6 pt-24 pb-16">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 mt-14">
          {/* 全件の帯 */}
          <div className="lg:col-span-2 order-2 lg:order-1 mt-10 lg:mt-0">
            <div className="marginalia mb-3">{entries.length} Entries</div>
            <div
              ref={stripRef}
              className="flex lg:block gap-2 lg:gap-0 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto lg:max-h-[60vh] lg:pr-2 diary-strip"
            >
              {entries.map((entry, i) => (
                <button
                  key={entry.noteUrl}
                  type="button"
                  data-active={i === index}
                  onClick={() => setIndex(i)}
                  aria-label={`${entry.kind} ${entry.title}`}
                  aria-current={i === index ? 'true' : undefined}
                  className={`block shrink-0 w-16 lg:w-full aspect-[1280/669] mb-0 lg:mb-1.5 overflow-hidden border-0 p-0 bg-transparent transition-opacity duration-300 ${
                    i === index ? 'opacity-100' : 'opacity-35 hover:opacity-70'
                  }`}
                >
                  <img
                    src={entry.eyecatch}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 選ばれた 1 件 */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.a
                key={current.noteUrl}
                href={current.noteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {/*
                  比率を 4:3 に固定していたが、note の画像は 1280x669（1.91:1）で、
                  両端を 3 割ほど切り落としたうえに拡大されて粗く見えていた。
                  比率は強制せず、写真そのままの形で置く。
                */}
                <img
                  src={current.eyecatch}
                  alt={current.name}
                  className="w-full h-auto"
                />
              </motion.a>
            </AnimatePresence>

            <div className="mt-6">
              <div className="marginalia mb-2">
                {current.kind} — {current.created_at}
              </div>
              <a
                href={current.noteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rule-underline text-[15px] sm:text-[17px] text-ink"
              >
                {current.title} <span className="text-[9px] align-super">↗</span>
              </a>
            </div>
          </div>

          {/* 現在地 */}
          <div className="lg:col-span-3 order-3 mt-10 lg:mt-0 lg:pl-6">
            <div className="flex items-center gap-3">
              <span className="marginalia !text-ink">{pad(index + 1)}</span>
              <span className="relative block flex-1 h-px bg-ink/20">
                <span
                  className="absolute inset-y-0 left-0 bg-ink/60 transition-[width] duration-500 ease-out"
                  style={{ width: `${((index + 1) / entries.length) * 100}%` }}
                />
              </span>
              <span className="marginalia">{pad(entries.length)}</span>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={() => step(-1)}
                disabled={index === 0}
                className="marginalia bg-transparent border-0 p-0 disabled:opacity-25 hover:!text-ink transition-colors"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                disabled={index === entries.length - 1}
                className="marginalia bg-transparent border-0 p-0 disabled:opacity-25 hover:!text-ink transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiaryIndex;
