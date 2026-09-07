import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Cursor from './components/common/Cursor';

import Top from './pages/Top';
import About from './pages/About';
import Book from './pages/Book';
import Travel from './pages/Travel';

const AppContent: React.FC = () => {
  const location = useLocation();
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    // 1. Lenis初期化（もっさり感をなくし、サクッと軽快なスクロールにするためにdurationを短縮）
    const lenis = new Lenis({
      duration: 0.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // 2. GSAP Tickerと同期
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 3. 高さが本当に変わった時のみLenisとScrollTriggerを更新する
    let lastHeight = document.body.scrollHeight;
    let timeoutId: NodeJS.Timeout | null = null;
    const resizeObserver = new ResizeObserver(() => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const currentHeight = document.body.scrollHeight;
        if (currentHeight !== lastHeight) {
          lastHeight = currentHeight;
          lenis.resize();
          ScrollTrigger.refresh();
        }
      }, 150); // Debounce処理で連続発火を抑制
    });
    resizeObserver.observe(document.body);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      resizeObserver.disconnect();
    };
  }, []);

  // ページ遷移時にFooterを隠し、一番上（またはハッシュの位置）へ移動する
  useEffect(() => {
    setShowFooter(false);

    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }

    // 遷移先がマウントされ、ScrollTriggerのpinで高さが確定してから移動する
    const id = location.hash.slice(1);
    const timeoutId = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start' });
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [location.pathname, location.hash]);

  const handleScrollEnd = (atEnd: boolean) => {
    setShowFooter(atEnd);
  };

  const isTopPage = location.pathname === '/watashi' || location.pathname === '/watashi/';
  const isAboutPage = location.pathname === '/watashi/about';

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Cursor />
      <Navbar />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Switch location={location} key={location.pathname}>
            <Route exact path="/watashi" component={Top} />
            <Route path="/watashi/about" render={() => <About onScrollEnd={handleScrollEnd} />} />
            <Route path="/watashi/book" component={Book} />
            <Route path="/watashi/travel" component={Travel} />
            <Route render={() => <Top />} />
          </Switch>
        </AnimatePresence>
      </main>

      {/* Aboutではフラグが必要。それ以外(Book/Travel)では常に出す設定 */}
      {!isTopPage && (
        (isAboutPage ? showFooter : true) && <Footer />
      )}
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;