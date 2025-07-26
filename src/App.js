// App.jsx

import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.min.css';
import './css/App.css';
import "./css/custom-navbar.css";
import Travel from './travel/Travel';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import About from './about/About';
import Top from './Top';
import Book from './book/Book';
import Cursor from './Cursor';

function App() {
  const [showContact, setShowContact] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const handleAboutScrollEnd = (atEnd) => {
    setShowContact(atEnd);
  };

  const blurStyle = (scrolled) => ({
    filter: scrolled ? 'blur(0.5px)' : 'none',
    transitionProperty: 'all',
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease',
  });

  const menuList = (
    <ul className="flex flex-col sm:flex-row font-normal font-jp sm:space-x-10 items-end sm:items-center">
      <li className="nav-item my-2 sm:my-0">
        <a
          href="/watashi/about"
          className={`
            transition-[text-decoration-color] duration-300 wavy-underline
            ${scrolled ? 'text-sm' : 'text-base'}
            text-black hover:text-black hover:opacity-100
          `}
          style={{
            ...blurStyle(scrolled),
            cursor: 'pointer',
            fontWeight: 400,
            lineHeight: 1.6,
            margin: 0,
            letterSpacing: '0.04em',
            textDecoration: 'none',
          }}
          onClick={() => setMenuOpen(false)}
        >
          わたし
        </a>
      </li>
      <li className="nav-item my-2 sm:my-0">
        <a
          href="/watashi/about#history"
          className={`
            transition-[text-decoration-color] duration-300 wavy-underline
            ${scrolled ? 'text-sm' : 'text-base'}
            text-black hover:text-black hover:opacity-100
          `}
          style={{
            ...blurStyle(scrolled),
            cursor: 'pointer',
            fontWeight: 400,
            lineHeight: 1.6,
            margin: 0,
            letterSpacing: '0.04em',
            textDecoration: 'none',
          }}
          onClick={() => setMenuOpen(false)}
        >
          これまでのわたし
        </a>
      </li>
      <li className="nav-item my-2 sm:my-0">
        <a
          href="/watashi/about#book-diary"
          className={`
            transition-[text-decoration-color] duration-300 wavy-underline
            ${scrolled ? 'text-sm' : 'text-base'}
            text-black hover:text-black hover:opacity-100
          `}
          style={{
            ...blurStyle(scrolled),
            cursor: 'pointer',
            fontWeight: 400,
            lineHeight: 1.6,
            margin: 0,
            letterSpacing: '0.04em',
            textDecoration: 'none',
          }}
          onClick={() => setMenuOpen(false)}
        >
          読書の日記
        </a>
      </li>
      <li className="nav-item flex flex-col items-center relative my-2 sm:my-0" style={{ minWidth: 'max-content' }}>
        <h3
          className={`
            transition-[text-decoration-color] duration-300 wavy-underline
            ${scrolled ? 'text-sm' : 'text-base'}
            text-black hover:text-black hover:opacity-100
          `}
          style={{
            ...blurStyle(scrolled),
            letterSpacing: '0.04em',
            lineHeight: 1.6,
            cursor: 'pointer',
            fontWeight: 400,
            margin: 0,
          }}
        >
          <a
            href="https://note.com/izuha0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-inherit"
            style={{
              ...blurStyle(scrolled),
              textDecoration: 'none',
              color: 'inherit',
              font: 'inherit',
              fontWeight: 400,
              lineHeight: 1.6,
              margin: 0,
              letterSpacing: '0.04em',
            }}
            onClick={() => setMenuOpen(false)}
          >
            note ↗︎
          </a>
        </h3>
        <h3
          className={`
            transition-[text-decoration-color] duration-300 wavy-underline
            ${scrolled ? 'text-sm' : 'text-base'}
            text-black hover:text-black hover:opacity-100
          `}
          style={{
            ...blurStyle(scrolled),
            letterSpacing: '0.04em',
            lineHeight: 1.6,
            cursor: 'pointer',
            fontWeight: 400,
            margin: 0,
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
          }}
        >
          <a
            href="https://note.com/izuha0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-inherit"
            style={{
              ...blurStyle(scrolled),
              textDecoration: 'none',
              color: 'inherit',
              font: 'inherit',
              fontWeight: 400,
              lineHeight: 1.6,
              margin: 0,
              letterSpacing: '0.04em',
            }}
            onClick={() => setMenuOpen(false)}
          >
            reads(@izuha) ↗︎
          </a>
        </h3>
      </li>
    </ul>
  );

  return (
    <div className="bg-white">
      <Cursor />
      <Router>
        <div
          className={`
            font-normal font-jp custom-navbar flex items-center justify-between
            fixed top-0 left-0 w-full z-50
            transition-all duration-300
            ${scrolled ? 'backdrop-blur-sm' : ''}
          `}
          style={{
            background: 'transparent',
            minHeight: scrolled ? '2.5rem' : '4rem',
            height: scrolled ? '2.5rem' : '4rem',
          }}
        >
          <Link to="/watashi">
            <h3
              className={`
                mt-2 ml-4 transition-all duration-300
                ${scrolled ? 'text-base opacity-60' : 'text-lg opacity-100'}
                text-black
              `}
              style={{
                ...blurStyle(scrolled),
                fontWeight: 400,
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              wahashi - izumi haruya
            </h3>
          </Link>
          <div className="flex items-center mr-2 sm:mr-4 mt-5">
            {/* PC: 通常メニュー */}
            <nav className="hidden sm:block">{menuList}</nav>
            {/* モバイル: ハンバーガー */}
            <button
              className="sm:hidden flex flex-col justify-center items-center w-10 h-10 ml-2"
              aria-label="メニュー"
              onClick={() => setMenuOpen((open) => !open)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                position: 'relative',
                right: 0,
                // スクロール時に小さく・薄くしたい場合はここで調整
                transform: scrolled ? 'scale(0.85)' : 'scale(1)',
                opacity: scrolled ? 0.6 : 1,
                transition: 'all 0.3s cubic-bezier(.4,2,.3,1)',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: 10,
                  width: 24,
                  height: 1.5,
                  background: '#222',
                  borderRadius: 2,
                  transition: '0.3s',
                  transform: menuOpen ? 'rotate(45deg)' : 'translateY(-6px)',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: 10,
                  width: 24,
                  height: 1.5,
                  background: '#222',
                  borderRadius: 2,
                  opacity: menuOpen ? 0 : 1,
                  transition: '0.3s',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: 10,
                  width: 24,
                  height: 1.5,
                  background: '#222',
                  borderRadius: 2,
                  transition: '0.3s',
                  transform: menuOpen ? 'rotate(-45deg)' : 'translateY(6px)',
                }}
              />
            </button>
          </div>
        </div>
        {/* ヘッダー分の余白（半分に変更） */}
        <div style={{ height: scrolled ? '1.25rem' : '2rem' }} />
        {/* モバイルメニューオーバーレイ */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-40 bg-white bg-opacity-95 flex flex-col items-center justify-center sm:hidden"
            style={{
              transition: 'opacity 0.3s',
              opacity: 1,
            }}
          >
            <nav>
              <ul className="flex flex-col space-y-8 text-xl font-jp">
                <li>
                  <a href="/watashi/about" onClick={() => setMenuOpen(false)}>
                    わたし
                  </a>
                </li>
                <li>
                  <a href="/watashi/about#history" onClick={() => setMenuOpen(false)}>
                    これまでのわたし
                  </a>
                </li>
                <li>
                  <a href="/watashi/about#book-diary" onClick={() => setMenuOpen(false)}>
                    読書の日記
                  </a>
                </li>
                <li>
                  <a
                    href="https://note.com/izuha0"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                  >
                    note ↗︎
                  </a>
                </li>
                <li>
                  <a
                    href="https://note.com/izuha0"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                  >
                    reads(@izuha) ↗︎
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
        <div>
          <Switch>
            <Route exact path="/watashi" component={Top} />
            <Route
              path="/watashi/about"
              render={() => <About onScrollEnd={handleAboutScrollEnd} />}
            />
            <Route path="/watashi/book" component={Book} />
            <Route path="/watashi/travel" component={Travel} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
