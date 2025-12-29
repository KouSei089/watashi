import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // メニュー開閉時にスクロールをロック
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  // ページ遷移やリンククリック時にメニューを閉じる
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const menuItems = [
    { name: 'わたし', path: '/watashi/about' },
    { name: 'これまでのわたし', path: '/watashi/about#history' },
    { name: '旅の記録', path: '/watashi/travel' },
    { name: '読書の日記', path: '/watashi/about#book-diary' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 flex items-center justify-between px-6 md:px-12 font-jp ${
          scrolled || menuOpen ? 'backdrop-blur-md bg-white/80' : 'bg-transparent'
        } ${scrolled ? 'border-b border-gray-100' : ''}`}
        style={{ height: scrolled ? '3.5rem' : '5rem' }}
      >
        {/* ロゴ */}
        <Link to="/watashi" className="no-underline z-[110]" onClick={handleLinkClick}>
          <h1 className={`text-black transition-all duration-300 font-normal m-0 tracking-tight ${
            scrolled ? 'text-sm opacity-70' : 'text-base opacity-100'
          }`}>
            watashi - izumi haruya
          </h1>
        </Link>

        {/* デスクトップメニュー */}
        <div className="hidden md:flex items-center">
          <ul className="flex space-x-8 list-none m-0 p-0 items-center">
            {menuItems.map((item) => (
              <li key={item.path}>
                {item.path.includes('#') ? (
                  <a
                    href={item.path}
                    className={`text-black no-underline wavy-underline transition-all duration-300 ${scrolled ? 'text-xs' : 'text-sm'}`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    to={item.path}
                    className={`text-black no-underline wavy-underline transition-all duration-300 ${scrolled ? 'text-xs' : 'text-sm'}`}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* モバイルハンバーガーボタン (バツ印の修正) */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative z-[110] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          <div className="relative w-5 h-4">
            <span className={`absolute block w-5 h-[1.5px] bg-black transition-all duration-300 ease-in-out ${
              menuOpen ? 'top-2 rotate-45' : 'top-0'
            }`} />
            <span className={`absolute block w-5 h-[1.5px] bg-black transition-all duration-300 ease-in-out top-2 ${
              menuOpen ? 'opacity-0' : 'opacity-100'
            }`} />
            <span className={`absolute block w-5 h-[1.5px] bg-black transition-all duration-300 ease-in-out ${
              menuOpen ? 'top-2 -rotate-45' : 'top-4'
            }`} />
          </div>
        </button>
      </nav>

      {/* モバイルメニューオーバーレイ */}
      <div className={`fixed inset-0 z-[90] bg-white transition-all duration-500 ease-in-out md:hidden ${
        menuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
      }`}>
        <div className="flex flex-col items-center justify-center h-full space-y-12 font-jp">
          {menuItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={handleLinkClick}
              className="text-2xl text-black no-underline tracking-[0.2em] transition-transform active:scale-95"
            >
              {item.name}
            </a>
          ))}
          <a 
            href="https://note.com/izuha0" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm text-gray-400 no-underline pt-8"
            onClick={handleLinkClick}
          >
            note ↗
          </a>
          
          {/* 閉じるための補助ボタン（戻る方法を分かりやすく） */}
          <button 
            onClick={handleLinkClick}
            className="text-xs text-gray-300 uppercase tracking-widest pt-12"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;