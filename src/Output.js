import { Layout } from 'antd';
import Cards from './Card';

const { Header, Content } = Layout;

const Output = () => {
  return (
    <div className="bg-natural">
      <Layout>
        <Header className="bg-natural text-5xl style-ale tracking-wide pl-48">
          Output
        </Header>
        <Content className="bg-natural font-zen leading-5 pt-6">
          <p className="px-72">日々アウトプットしております。</p>
        </Content>
        <div className="flex justify-center py-24 bg-natural">
          <div className=""><Cards /></div>
          <div className=""><Cards /></div>
          <div className=""><Cards /></div>
        </div>
      </Layout>
    </div>
  )
}

export default Output;
