import React, { useState, useCallback } from "react";
import books from "../data/regional/regional_detail.json";

// 型定義
interface BookItem {
  name: string;
  eyecatch: string;
  created_at: string;
  noteUrl: string;
}

// コンポーネントの分離: BookCard
const BookCard: React.FC<{ item: BookItem }> = ({ item }) => (
  <a 
    href={item.noteUrl} 
    target="_blank" 
    rel="noreferrer" // セキュリティ対策
    className="inline-block px-8 py-12 group" // hover:opacityはgroupで管理すると綺麗
  >
    <div className="transition-all duration-300 group-hover:opacity-50 font-body">
      <img 
        className="w-72 h-48 object-cover shadow-sm" 
        src={item.eyecatch} 
        alt={item.name} 
      />
      <h2 className="mt-4 text-base text-gray-600">{item.name}</h2>
      <h3 className="mt-2 text-sm text-gray-400">{item.created_at}</h3>
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
    <section className="min-h-screen py-12">
      <div className="px-4 lg:px-24 text-center">
        {/* グリッド表示を安定させるためのWrapper */}
        <div className="flex flex-wrap justify-center">
          {displayItems.map((book: any) => (
            <BookCard key={book.name} item={book} />
          ))}
        </div>

        {isLoading && (
          <div className="mt-12">
            <button
              onClick={loadMore}
              className="px-6 py-2 border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all duration-300 rounded"
            >
              さらに読み込む
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Book;