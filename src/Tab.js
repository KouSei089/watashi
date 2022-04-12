import React from 'react'
import TimeTree from './TimeTree';
import Cards from './Card';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const Tab = () => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="My Profile" key="1">
      <TimeTree />
    </TabPane>
    <TabPane tab="Output" key="2">
      <Cards/>
    </TabPane>
    <TabPane tab="Tab 3" key="3">
      4
    </TabPane>
  </Tabs>
);

export default Tab;
