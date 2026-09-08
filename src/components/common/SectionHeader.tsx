import React from 'react';

interface SectionHeaderProps {
  /** アンカー用。ナビと章レールが参照する */
  id: string;
  /** 章番号。01, 02, 03 */
  index: string;
  /** 余白に置く欧文のラベル */
  label: string;
  children: React.ReactNode;
  /** 見出しの下に添える短い説明 */
  note?: React.ReactNode;
  className?: string;
}

/**
 * 章の見出し。
 *
 * 以前は 72px の大見出しを置いていたが、余白に小さなラベルを添えて
 * 情報を整然と並べる組みに変えた。広い画面では左の余白に章番号と
 * 欧文ラベルが立ち、本文は右の列から始まる。
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  id,
  index,
  label,
  children,
  note,
  className = '',
}) => (
  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-y-4 lg:gap-x-10 ${className}`}>
    <div className="lg:col-span-2 flex lg:flex-col items-baseline lg:items-start gap-3 lg:gap-2">
      <span className="marginalia">({index})</span>
      <span className="marginalia">{label}</span>
    </div>

    <div className="lg:col-span-10">
      <h2
        id={id}
        className="font-display text-[30px] sm:text-[40px] leading-[1.2] text-ink tracking-[0.01em] m-0 scroll-mt-24"
      >
        {children}
      </h2>
      {note && (
        <div className="mt-6 max-w-xl text-[13px] text-ink/50 leading-[1.65] tracking-[0.02em]">
          {note}
        </div>
      )}
    </div>
  </div>
);

export default SectionHeader;
