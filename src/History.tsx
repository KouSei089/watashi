import React from 'react';
import HistoryTimeTree from './HistoryTimeTree';
import { Layout } from 'antd';

const { Header, Content } = Layout;

const History = () => {
  return (
    <Layout>
      <Header className="bg-white title-text">
      </Header>
      <Content className="bg-white font-zen leading-5 pt-6">
        <p className="px-6 md:px-24 lg:px-72"><HistoryTimeTree /></p>
      </Content>
    </Layout>
  )
}

export default History;
