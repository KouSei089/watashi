import React from 'react';
import { useEffect, useState } from "react";
import 'antd/dist/antd.min.css';
import './App.css';
import Profile from './Profile';
import History from './History';
import Contact from './Contact';
import Note from './Note';
import axios from 'axios';

function App() {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   //fetch("")https://note.com/api/v2/creators/izuha0/contents?kind=note&page=1
  //   fetch("https://note.com/api/v2/creators/izuha0/", {method: 'get'})
  //     .then((res) => res.json())
  //     .then((json) => setData(json))
  //     .catch(() => alert("error"));
  // }, []);
  // console.log(data)

  // useEffect(() => {
  //   const getUser = async () => {
  //     const response = await axios.get('https://api.github.com/users/tagty');
  //     console.log(response.data)
  //   }
  //   getUser()
  // }, [])
  
  return (
    <div className="bg-natural">
      <Profile />
      <History />
      {/* <Portfolio /> */}
      {/* <Output /> */}
      <Contact />
    </div>
  );
}

export default App;
