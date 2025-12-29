import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './css/App.css';
import './css/index.css';

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
    // 1. Lenis初期化
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // 2. GSAP Tickerと同期
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 3. 高さが変わった時にLenisに通知する
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      resizeObserver.disconnect();
    };
  }, []);

  // ページ遷移時にFooterを隠し、一番上へ戻る
  useEffect(() => {
    setShowFooter(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
        <Switch>
          <Route exact path="/watashi" component={Top} />
          <Route path="/watashi/about" render={() => <About onScrollEnd={handleScrollEnd} />} />
          <Route path="/watashi/book" component={Book} />
          <Route path="/watashi/travel" component={Travel} />
          <Route render={() => <Top />} />
        </Switch>
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