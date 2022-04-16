import React from 'react';
import 'antd/dist/antd.min.css';
import './App.css';
import Profile from './Profile';
import History from './History';
import Portfolio from './Portfolio';
import Output from './Output';
import Contact from './Contact';

function App() {
  return (
    <div className="bg-natural">
      <Profile />
      <History />
      <Portfolio />
      <Output />
      <Contact />
    </div>
  );
}

export default App;
