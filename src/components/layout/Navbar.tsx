import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useLenis, useScrollTo } from '../../lib/lenis';
import { NOTE_URL } from '../../data/site';

const HOME_PATH = '/watashi';

// --- 「旅の記録」をコメントアウトしました ---
// 1ページ構成になったので、遷移ではなく同じページ内の章へ送る
const menuItems = [
  { name: 'わたし', hash: '#profile' },
  { name: 'これまでのわたし', hash: '#history' },
  // { name: '旅の記録', path: '/watashi/travel' },
  { name: '読書の日記', hash: '#book-diary' },
];

const ExternalIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block ml-0.5 mb-0.5 opacity-60"
  >
    <path
      d="M3.5 1.5H10.5V8.5M10.5 1.5L1.5 10.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const lenis = useLenis();
  const scrollTo = useScrollTo();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const update = ({ scroll }: { scroll: number } = { scroll: window.scrollY }) => {
      setScrolled(scroll > 10);
    };

    // Lenis が動いているならその scroll イベントに相乗りする
    if (lenis) {
      lenis.on('scroll', update);
      return () => lenis.off('scroll', update);
    }
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lenis]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const goToChapter = (hash: string) => {
    setMenuOpen(false);

    // 別ページにいるときは本体へ戻す。App 側がハッシュを見て送り届ける。
    if (location.pathname !== HOME_PATH) {
      history.push({ pathname: HOME_PATH, hash });
      return;
    }
    scrollTo(hash);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 flex items-center justify-between px-6 md:px-12 font-jp ${
          scrolled || menuOpen ? 'backdrop-blur-md bg-white/80' : 'bg-transparent'
        } ${scrolled ? 'border-b border-gray-100' : ''}`}
        style={{ height: scrolled ? '3.5rem' : '5rem' }}
      >
        <Link
          to={HOME_PATH}
          className="no-underline z-[110]"
          onClick={(e) => {
            setMenuOpen(false);
            if (location.pathname === HOME_PATH) {
              e.preventDefault();
              scrollTo(0);
            }
          }}
        >
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
              <li key={item.hash}>
                <button
                  type="button"
                  onClick={() => goToChapter(item.hash)}
                  className={`text-black bg-transparent border-0 p-0 cursor-pointer wavy-underline transition-all duration-500 ease-out hover:opacity-60 ${scrolled ? 'text-xs' : 'text-sm'}`}
                >
                  {item.name}
                </button>
              </li>
            ))}
            <li>
              <a
                href={NOTE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black no-underline text-[10px] opacity-40 hover:opacity-100 transition-opacity flex items-center"
              >
                note <ExternalIcon />
              </a>
            </li>
          </ul>
        </div>

        {/* モバイルハンバーガー */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative z-[110] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
        >
          <div className="relative w-5 h-4">
            <span className={`absolute block w-5 h-[1.5px] bg-black transition-all duration-300 ${menuOpen ? 'top-2 rotate-45' : 'top-0'}`} />
            <span className={`absolute block w-5 h-[1.5px] bg-black transition-all duration-300 top-2 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute block w-5 h-[1.5px] bg-black transition-all duration-300 ${menuOpen ? 'top-2 -rotate-45' : 'top-4'}`} />
          </div>
        </button>
      </nav>

      {/* モバイルメニュー */}
      <div className={`fixed inset-0 z-[90] bg-white transition-all duration-500 ease-in-out md:hidden ${
        menuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
      }`}>
        <div className="flex flex-col items-center justify-center h-full space-y-10 font-jp">
          {menuItems.map((item) => (
            <button
              key={item.hash}
              type="button"
              onClick={() => goToChapter(item.hash)}
              className="text-xl text-black bg-transparent border-0 tracking-[0.15em]"
            >
              {item.name}
            </button>
          ))}
          <a
            href={NOTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-gray-400 no-underline flex items-center"
            onClick={() => setMenuOpen(false)}
          >
            note <ExternalIcon />
          </a>
          <button onClick={() => setMenuOpen(false)} className="text-[10px] text-gray-300 uppercase tracking-widest pt-8">Close</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
