// src/components/layout/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // メニューが開いているときはスクロール禁止
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const blurStyle = {
    filter: scrolled ? 'blur(0.5px)' : 'none',
    transition: 'all 300ms ease',
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-sm' : ''}`}
           style={{ minHeight: scrolled ? '2.5rem' : '4rem', background: 'transparent' }}>
        <div className="flex items-center justify-between px-4 h-full">
          <Link to="/watashi">
            <h3 className={`transition-all duration-300 ${scrolled ? 'text-base opacity-60' : 'text-lg'}`} style={blurStyle}>
              watashi - izumi haruya
            </h3>
          </Link>
          
          {/* PC Menu & Hamburger Menu logic here... (App.jsから移植) */}
        </div>
      </nav>
      {/* Spacer */}
      <div style={{ height: scrolled ? '1.25rem' : '2rem' }} />
    </>
  );
};