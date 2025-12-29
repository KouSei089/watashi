import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';

// CSS
import './css/App.css';
import './css/index.css';

// Layout / Common
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Cursor from './components/common/Cursor';

// Pages
import Top from './pages/Top';
import About from './pages/About';
import Book from './pages/Book';
import Travel from './pages/Travel';

// フッターの表示制御を分離するための内部コンポーネント
const AppContent: React.FC = () => {
  const location = useLocation();
  const [showContact, setShowContact] = useState(false); // 初期値は false

  const handleAboutScrollEnd = (atEnd: boolean) => {
    setShowContact(atEnd);
  };

  // Topページかどうかを判定
  const isTopPage = location.pathname === '/watashi' || location.pathname === '/watashi/';

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Cursor />
      <Navbar />
      
      <main className="flex-grow">
        <Switch>
          <Route exact path="/watashi" component={Top} />
          <Route 
            path="/watashi/about" 
            render={() => <About onScrollEnd={handleAboutScrollEnd} />} 
          />
          <Route path="/watashi/book" component={Book} />
          <Route path="/watashi/travel" component={Travel} />
          <Route render={() => <Top />} />
        </Switch>
      </main>

      {/* 1. Topページではない 
        2. かつ showContact が true（Aboutで末尾まで到達）
        の時だけ Footer を表示
      */}
      {!isTopPage && showContact && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;