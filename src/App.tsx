// src/App.tsx
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/App.css';

// コンポーネントのインポート
import { Navbar } from './components/layout/Navbar';
import Cursor from './components/common/Cursor';
import Top from './pages/Top';
import About from './pages/About';
import Book from './pages/Book';
import Travel from './pages/Travel';

function App() {
  return (
    <div className="bg-white">
      <Router>
        <Cursor />
        <Navbar />
        
        <main>
          <Switch>
            <Route exact path="/watashi" component={Top} />
            <Route path="/watashi/about" component={About} />
            <Route path="/watashi/book" component={Book} />
            <Route path="/watashi/travel" component={Travel} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;