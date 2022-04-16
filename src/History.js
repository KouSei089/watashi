import HistoryTimeTree from './HistoryTimeTree';
import { Layout } from 'antd';

const { Header, Content } = Layout;

const History = () => {
  return (
    <Layout>
      <Header className="bg-natural title-text">
        History
      </Header>
      <Content className="bg-natural font-zen leading-5 pt-6">
        <p className="px-6 md:px-24 lg:px-72"><HistoryTimeTree /></p>
      </Content>
    </Layout>
  )
}

export default History;
