import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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

const App: React.FC = () => {
  // 元の App.js にあった Contact 表示制御用の状態
  // About ページからのコールバック等で利用する場合に保持しておきます
  const [showContact, setShowContact] = useState(true);

  const handleAboutScrollEnd = (atEnd: boolean) => {
    setShowContact(atEnd);
  };

  return (
    <Router>
      <div className="bg-white min-h-screen flex flex-col">
        {/* 共通のカーソル演出 */}
        <Cursor />
        
        {/* ナビゲーションバー */}
        <Navbar />
        
        {/* メインコンテンツエリア */}
        <main className="flex-grow">
          <Switch>
            {/* About ページにはスクロール検知の props を渡す必要があるため
                render 属性を使用してコンポーネントを呼び出します
            */}
            <Route exact path="/watashi" component={Top} />
            
            <Route 
              path="/watashi/about" 
              render={() => <About onScrollEnd={handleAboutScrollEnd} />} 
            />
            
            <Route path="/watashi/book" component={Book} />
            
            <Route path="/watashi/travel" component={Travel} />
            
            {/* 404など該当がない場合のフォールバック（任意） */}
            <Route render={() => <Top />} />
          </Switch>
        </main>

        {/* ページ下部に共通のフッターを配置。
           もし About ページなどで特定の条件（showContact）によって
           Footer を隠したい場合は {showContact && <Footer />} とします。
        */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;