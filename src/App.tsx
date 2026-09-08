import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { LenisProvider, useScrollTo } from './lib/lenis';

import Navbar from './components/layout/Navbar';
import ChapterRail from './components/layout/ChapterRail';
import Cursor from './components/common/Cursor';

import Home from './pages/Home';
import Travel from './pages/Travel';

const AppContent: React.FC = () => {
  const location = useLocation();
  const scrollTo = useScrollTo();

  useEffect(() => {
    // ハッシュ付きで開かれたときは、その章まで送る。
    // pin の分だけ高さが確定するのを待つ必要があるので 1 フレームでは足りない。
    if (location.hash) {
      const timeoutId = setTimeout(() => scrollTo(location.hash), 300);
      return () => clearTimeout(timeoutId);
    }

    // ScrollTrigger は refresh の前後でスクロール位置を控えて復元する。
    // 先頭から読み始めてほしい場面でその記憶が残っていると、
    // 読み始める前に途中まで送られてしまう。
    ScrollTrigger.clearScrollMemory();
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash, scrollTo]);

  return (
    <div className="bg-paper min-h-screen">
      <Cursor />
      <Navbar />
      <ChapterRail />

      <main>
        <Switch>
          <Route exact path="/watashi" component={Home} />
          <Route path="/watashi/travel" component={Travel} />
          <Route render={() => <Redirect to="/watashi" />} />
        </Switch>
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
