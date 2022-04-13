import React from 'react';
import 'antd/dist/antd.min.css';
import './App.css';
import { Layout } from 'antd';
import Cards from './Card';
import { Row, Col } from 'antd';

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <div className="bg-green-300">
      <Layout>
        <Header className="bg-white"></Header>
        <Content className="bg-white text-7xl text-center font-thin tracking-wider font-ale">Izumi Haruya</Content>
        <Footer className="bg-white"></Footer>
      </Layout>
      <Layout>
        <Header className="bg-white text-2xl font-ale font-thin tracking-wide">
          Profile
        </Header>
        <Content className="bg-natural font-zen leading-5">
        	大手アパレルブランドで5年間の実務を経験。プログラミングの独学・読書を通じてテクノロジーでの問題解決を知り、エンジニアになりたいと考え、2021年4月よりプログラミングスクールRUNTEQへ入学。その後『Mikke（ミッケ）習慣ジャーナリング』を個人開発し、リリースする。月間1500PV以上 / UU200人以上を達成しました。
          現在は、React/TypeScriptを使用したアプリを作成中です。
          個人活動では、オンラインコミュニティ『DIALogue』を運営おります。
        </Content>
        <Row type="flex" justify="space-around"  style={{ padding: '10px', backgroundColor: '#f7f3ec' }}>
          <Col span={8}><Cards /></Col>
          <Col span={8}><Cards /></Col>
          <Col span={8}><Cards /></Col>
        </Row>
        <h1 className="text-3xl font-bold underline text-green-500">
          Hello world!
        </h1>
    </Layout>
    </div>
  );
}

export default App;
