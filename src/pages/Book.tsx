import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { eyecatchData } from "../data/eyecatchData";
import { BookItem } from "../types";

// 旅の記録データ(regional_detail.json)を読み込んでいたため、
// name / eyecatch / noteUrl が存在せず空のカードが並んでいた。
const books = [...eyecatchData].sort((a, b) => b.created_at.localeCompare(a.created_at));

// コンポーネントの分離: BookCard
const BookCard: React.FC<{ item: BookItem }> = ({ item }) => (
  <a 
    href={item.noteUrl} 
    target="_blank" 
    rel="noreferrer"
    className="group block overflow-hidden rounded shadow-sm bg-white" 
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <img 
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform" 
        src={item.eyecatch || 'https://via.placeholder.com/400x300'} 
        alt={item.name} 
        loading="lazy"
      />
      {/* ホバー時の暗転レイヤー */}
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <div className="p-4 sm:p-5 font-jp">
      <h2 className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium line-clamp-2">{item.name}</h2>
      <h3 className="mt-2 text-[10px] sm:text-xs text-gray-400 tracking-wider">{item.created_at}</h3>
    </div>
  </a>
);

const Book: React.FC = () => {
  const ITEMS_PER_PAGE = 12;
  const [displayItemsCount, setDisplayItemsCount] = useState(ITEMS_PER_PAGE);

  const loadMore = useCallback(() => {
    setDisplayItemsCount((count) => count + ITEMS_PER_PAGE);
  }, []);

  const isLoading = displayItemsCount < books.length;
  const displayItems = books.slice(0, displayItemsCount);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen py-24 bg-gray-50/30"
    >
      <div className="px-6 sm:px-8 lg:px-24 mx-auto max-w-7xl">
        <h2 className="text-4xl sm:text-5xl md:text-7xl text-matte tracking-widest mb-16 text-center font-jp">
          読書
        </h2>
        
        {/* CSSグリッドに変更して整然としたレイアウトに */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {displayItems.map((book: BookItem, idx: number) => (
            <motion.div
              key={book.noteUrl}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
            >
              <BookCard item={book} />
            </motion.div>
          ))}
        </div>

        {isLoading && (
          <div className="mt-16 text-center">
            <button
              onClick={loadMore}
              className="px-8 py-3 bg-white border border-gray-200 text-gray-600 hover:bg-black hover:text-white transition-all duration-500 rounded text-sm tracking-widest font-jp"
            >
              さらに読み込む
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Book;