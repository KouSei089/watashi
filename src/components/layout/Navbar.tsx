import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLenis } from '../../lib/lenis';
import { NOTE_URL } from '../../data/site';
import { sections, HOME_PATH, CONTACT_PATH } from '../../data/sections';

// ナビに並べる項目。Contact は表紙の目次には出さず、ここと奥付だけに置く。
const tabs = [...sections.map((s) => ({ path: s.path, name: s.name, index: s.index })), { path: CONTACT_PATH, name: 'おといあわせ', index: '04' }];

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

  // 章を移ったらメニューを閉じる
  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-colors duration-300 flex items-center justify-between px-6 font-jp h-14 ${
          scrolled || menuOpen ? 'backdrop-blur-md bg-paper/85 border-b border-ink/10' : 'bg-transparent'
        }`}
      >
        <Link to={HOME_PATH} className="no-underline z-[110]">
          <h1 className="text-ink font-medium m-0 text-[13px] tracking-[0.02em]">
            watashi — izumi haruya
          </h1>
        </Link>

        {/* タブ。参考サイトと同じく、いま開いている章は淡く落とす */}
        <div className="hidden md:flex items-center">
          <ul className="flex list-none m-0 p-0 items-center gap-1.5">
            {tabs.map((section, i) => (
              <li key={section.path} className="flex items-center gap-1.5">
                <NavLink
                  to={section.path}
                  className="text-ink text-[13px] rule-underline transition-colors duration-300"
                  activeClassName="!text-ink/35 no-underline pointer-events-none"
                >
                  {section.name}
                </NavLink>
                {i < tabs.length - 1 && <span className="text-ink/30 text-[13px]">,</span>}
              </li>
            ))}
          </ul>
          <a
            href={NOTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-10 text-ink/40 no-underline text-[11px] hover:text-ink transition-colors flex items-center"
          >
            note <ExternalIcon />
          </a>
        </div>

        {/* モバイルハンバーガー */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative z-[110] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
        >
          <div className="relative w-5 h-4">
            <span className={`absolute block w-5 h-[1px] bg-ink transition-all duration-300 ${menuOpen ? 'top-2 rotate-45' : 'top-0'}`} />
            <span className={`absolute block w-5 h-[1px] bg-ink transition-all duration-300 top-2 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute block w-5 h-[1px] bg-ink transition-all duration-300 ${menuOpen ? 'top-2 -rotate-45' : 'top-4'}`} />
          </div>
        </button>
      </nav>

      {/* モバイルメニュー */}
      <div className={`fixed inset-0 z-[90] bg-paper transition-all duration-500 ease-in-out md:hidden ${
        menuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
      }`}>
        <div className="flex flex-col justify-center h-full px-6 gap-1">
          {tabs.map((section) => (
            <NavLink
              key={section.path}
              to={section.path}
              className="flex items-baseline gap-4 py-4 border-b border-ink/10 no-underline"
              activeClassName="opacity-35 pointer-events-none"
            >
              <span className="marginalia w-8">({section.index})</span>
              <span className="font-display text-[19px] text-ink">{section.name}</span>
            </NavLink>
          ))}
          <a
            href={NOTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 text-[13px] text-ink/40 no-underline flex items-center"
          >
            note <ExternalIcon />
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
