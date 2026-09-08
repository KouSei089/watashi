import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { LenisProvider } from './lib/lenis';
import { HOME_PATH } from './data/sections';

import Navbar from './components/layout/Navbar';
import Cursor from './components/common/Cursor';

import Index from './pages/Index';
import About from './pages/About';
import History from './pages/History';
import Diary from './pages/Diary';
import Travel from './pages/Travel';

/**
 * 章ごとに独立したページを持つ。
 *
 * 以前は 1 本の縦スクロールに統合していたが、表紙と読書の日記が
 * それぞれ 1 画面で完結する作りになり、スクロールで繋ぐ必然性が薄れた。
 * スクロールを要するのは「これまでのわたし」の横スクロールだけで、
 * それはページの中で従来どおり動く。
 *
 * GitHub Pages は SPA のルーティングを知らないため、直リンクとリロードは
 * public/404.html が index.html に引き戻している。
 */
const AppContent: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // ScrollTrigger は refresh の前後でスクロール位置を控えて復元する。
    // 章を移ったら必ず先頭から読ませたいので、その記憶を消してから戻す。
    ScrollTrigger.clearScrollMemory();
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="bg-paper min-h-screen">
      <Cursor />
      <Navbar />

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <Switch location={location}>
              <Route exact path={HOME_PATH} component={Index} />
              <Route path={`${HOME_PATH}/about`} component={About} />
              <Route path={`${HOME_PATH}/history`} component={History} />
              <Route path={`${HOME_PATH}/diary`} component={Diary} />
              <Route path={`${HOME_PATH}/travel`} component={Travel} />
              <Route render={() => <Redirect to={HOME_PATH} />} />
            </Switch>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <LenisProvider>
      <AppContent />
    </LenisProvider>
  </Router>
);

export default App;
