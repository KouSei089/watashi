import React from 'react';
import 'antd/dist/antd.min.css';
import './App.css';
import Profile from './Profile';
import History from './History';
import Contact from './Contact';

const App: React.FC = () => {
  return (
    <div className="bg-natural">
      <Profile />
      <History />
      <Contact />
    </div>
  )
}
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetch('https://note.com/api/v2/creators/izuha0/contents?kind=note&page=1', {
  //     method: 'get',
  //     credentials: 'same-origin',
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //     }
  //   }).then((res) => res.json())
  //     .then((json) => setData(json))
  //     .catch((error) => console.log({error}))
  // }, []);
  // console.log(data.join())
  
  

export default App;
