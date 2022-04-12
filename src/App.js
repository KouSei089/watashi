import React from 'react';
import Tab from './Tab';
import Description from './Description';
import { Spin, Space } from 'antd';
import './App.css';

function App() {
  return (
    <div>
      <Space size="middle">
        <Spin size="small" />
        <Spin />
        <Spin size="large" />
      </Space>
      <Description />
      <Tab />
    </div>
  );
}

export default App;
