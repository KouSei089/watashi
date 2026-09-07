import React from 'react';

interface SectionTitleProps {
  id?: string;
  children: React.ReactNode;
  /** 章のタイトルは近づくにつれて濃くなる */
  opacity?: number;
  className?: string;
}

/**
 * 各章の大見出し。
 * 以前は同じ Tailwind の並びが 4 箇所にコピーされていた。
 */
const SectionTitle: React.FC<SectionTitleProps> = ({ id, children, opacity = 1, className = '' }) => (
  <h2
    id={id}
    className={`text-4xl sm:text-5xl md:text-7xl text-matte tracking-wider transition-opacity duration-1000 scroll-mt-24 ${className}`}
    style={{ opacity }}
  >
    {children}
  </h2>
);

export default SectionTitle;
