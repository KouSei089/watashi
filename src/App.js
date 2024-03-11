import React from 'react';
import 'antd/dist/antd.min.css';
import './css/App.css';
import "./css/custom-navbar.css";
import Travel from './travel/Travel';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import About from './about/About';
import Contact from './about/Contact';
import Top from './Top';
import { Avatar } from "antd";
import Book from './book/Book';

const items = [
  {
    label: 'Top',
    key: 'Top',
    to: '/watashi',
  },
  {
    label: 'About',
    key: 'About',
    to: '/watashi/about',
  },
  {
    label: 'Book',
    key: 'Book',
    to: '/watashi/book',
  },
  {
    label: 'Travel',
    key: 'travel',
    to: '/watashi/travel',
  }
];

function App() {
  return (
    <div className="bg-white style-ale">
      <Router>
        <div className="custom-navbar flex items-center justify-between">
          <Link to="/watashi">
            <Avatar
              className="ml-1 w-16 h-16"
              src="https://github.com/KouSei089/watashi/assets/77420123/99032382-79be-4aff-8de7-8da88a043188"
            />
            <h3 className='mt-2'>Izumi Haruya</h3>
          </Link>
          <ul className="flex">
            {items.map((item) => (
              <li key={item.key} className="nav-item">
                <Link to={item.to} activeClassName="active">
                  <h3>{item.label}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Switch>
          <Route exact path="/watashi" component={Top} />
          <Route path="/watashi/about" component={About} />
          <Route path="/watashi/book" component={Book} />
          <Route path="/watashi/travel" component={Travel} />
        </Switch>
      </Router>
      <Contact />
    </div>
  );
}

export default App;
