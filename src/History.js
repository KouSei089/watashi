import TimeTree from './TimeTree';
import { Layout } from 'antd';

const { Header, Content } = Layout;

const History = () => {
  return (
    <Layout>
      <Header className="bg-natural text-5xl style-ale tracking-wide pl-48">
        History
      </Header>
      <Content className="bg-natural font-zen leading-5 pt-6">
        <p className="px-72"><TimeTree /></p>
      </Content>
    </Layout>
  )
}

export default History;


