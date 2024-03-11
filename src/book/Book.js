import { Link } from "react-router-dom";
import { useState, useCallback } from "react";
// import booksData from "./book-data.json";
import books from "./book-GAS.json";

const BookCard = ({ src, title, date, link }) => (
  <Link to={link} className="block inline-block px-8 py-12">
    <div className="transform transition-all duration-300 hover:opacity-50 font-body">
      <img className="w-72 h-48 object-cover" src={src} alt={title} />
      <h2 className="mt-4 text-base text-sky-gray">{title}</h2>
      <h3 className="mt-2 text-light-gray">{date}</h3>
    </div>
  </Link>
);

const Book = () => {
  const [displayItemsCount, setDisplayItemsCount] = useState(12);
  const loadMore = useCallback(() => {
    setDisplayItemsCount((count) => count + 12);
  }, []);

  const isLoading = displayItemsCount < books.length;
  const displayItems = books.slice(0, displayItemsCount);

  return (
    <div className="">
      <div className="px-20 lg:px-72 text-matte text-center">
      {displayItems.map((book) => (
        <BookCard
          key={book.title}
          src={book.eyecatch}
          title={book.name}
          date={book.created_at}
          link={book.noteUrl}
        />
      ))}
      {isLoading && (
        <div
          onClick={loadMore}
          className="cursor-pointer text-center transform transition-all duration-300 hover:opacity-50"
        >
          <button className="p-2 mt-2 bg-white text-matte">
            Load more...
          </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default Book;
