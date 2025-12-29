import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // スクロール検知
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // メニュー開いた時のスクロールロック
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  // ブラー・透過スタイル
  const blurClass = scrolled ? 'backdrop-blur-sm bg-white/70' : 'bg-transparent';

  const menuItems = [
    { name: 'わたし', path: '/watashi/about' },
    { name: 'これまでのわたし', path: '/watashi/about#history' },
    { name: '読書の日記', path: '/watashi/about#book-diary' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 flex items-center justify-between px-4 sm:px-8 font-jp ${blurClass}`}
        style={{ height: scrolled ? '3rem' : '5rem' }}
      >
        {/* ロゴ */}
        <Link to="/watashi" className="no-underline">
          <h1 className={`text-black transition-all duration-300 font-normal m-0 ${scrolled ? 'text-base opacity-60' : 'text-lg opacity-100'}`}>
            watashi - izumi haruya
          </h1>
        </Link>

        {/* デスクトップメニュー */}
        <nav className="hidden sm:block">
          <ul className="flex space-x-8 items-center list-none m-0 p-0">
            {menuItems.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  className={`text-black no-underline wavy-underline transition-all duration-300 ${scrolled ? 'text-sm' : 'text-base'}`}
                >
                  {item.name}
                </a>
              </li>
            ))}
            <li className="flex flex-col items-center relative group min-w-max">
               <a href="https://note.com/izuha0" target="_blank" rel="noopener noreferrer" className="text-black no-underline wavy-underline text-base">note ↗︎</a>
            </li>
          </ul>
        </nav>

        {/* モバイルハンバーガーボタン */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-10 h-10 relative z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`} />
          <span className={`block w-6 h-0.5 bg-black transition-all duration-300 my-1 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1.5'}`} />
        </button>
      </header>

      {/* モバイルメニューオーバーレイ */}
      <div className={`fixed inset-0 z-40 bg-white transition-transform duration-500 flex flex-col items-center justify-center sm:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav>
          <ul className="flex flex-col space-y-8 text-xl font-jp list-none p-0 text-center">
            {menuItems.map((item) => (
              <li key={item.path}>
                <a href={item.path} onClick={() => setMenuOpen(false)} className="text-black no-underline">{item.name}</a>
              </li>
            ))}
            <li><a href="https://note.com/izuha0" target="_blank" rel="noopener noreferrer" className="text-black no-underline">note ↗︎</a></li>
          </ul>
        </nav>
      </div>

      {/* ヘッダー分のスペーサー */}
      <div className="transition-all duration-300" style={{ height: scrolled ? '3rem' : '5rem' }} />
    </>
  );
};

export default Navbar;