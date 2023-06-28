import React from 'react';
import 'antd/dist/antd.min.css';
import './css/App.css';
import "./css/custom-navbar.css";
import Travel from './travel/Travel';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import About from './about/About';

const items = [
  {
    label: 'About',
    key: 'About',
    to: '/about',
  },
  {
    label: 'Travel',
    key: 'travel',
    to: '/travel',
  }
];

function App() {
  return (
    <div className="bg-white style-ale">
      <Router>
      <div className="custom-navbar">
          {items.map((item) => (
            <li key={item.key} className="nav-item">
              <Link to={item.to} activeClassName="active">
                {item.label}
              </Link>
            </li>
          ))}
        </div>
        <Switch>
          <Route exact path="/" component={About} />
          <Route path="/about" component={About} />
          <Route path="/travel" component={Travel} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
