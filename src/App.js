import React from 'react';
import 'antd/dist/antd.min.css';
import './App.css';
import Profile from './Profile';
import History from './History';
import Contact from './Contact';
import JapanMap from './JapanMap';

function App() {
  return (
    <div className="bg-white">
      <Profile />
      <History />
      <JapanMap />
      <Contact />
    </div>
  );
}

export default App;
