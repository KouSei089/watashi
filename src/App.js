import React from 'react';
import 'antd/dist/antd.min.css';
import './App.css';
import { Layout } from 'antd';
import Cards from './Card';
import { Row, Col } from 'antd';

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <>
      <Layout>
        <Header style={{
                color: 'black',
                backgroundColor: 'white',
              }}>
        </Header>
        <Content
          style={{
            fontSize: '96px',
            backgroundColor: 'white',
            textAlign: 'center',
            fontFamily: 'Alegreya Sans SC',
            fontWeight: 400,
            letterSpacing: 10
          }}
        >Izumi Haruya
        </Content>
        <Footer style={{backgroundColor: 'white'}}></Footer>
      </Layout>
      <Layout>
        <Header
          style={{
            backgroundColor: 'white',
            fontSize: '36px',
            fontFamily: 'Alegreya Sans SC',
            fontWeight: 400,
            letterSpacing: 5,
          }}
        >
          Profile
        </Header>
        <Content
          style={{
            backgroundColor: '#f7f3ec',
            fontFamily: 'Zen Kurenaido',
            padding: '96px',
            paddingTop: '20px',
            paddingBottom: 0,
            lineHeight: '30px',
          }}
        >
        手アパレルブランドで5年間の実務を経験。プログラミングの独学・読書を通じてテクノロジーでの問題解決を知り、エンジニアになりたいと考え、2021年4月よりプログラミングスクールRUNTEQへ入学。その後『Mikke（ミッケ）習慣ジャーナリング』を個人開発し、リリースする。月間1500PV以上 / UU200人以上を達成しました。
        現在は、React/TypeScriptを使用したアプリを作成中です。
        個人活動では、オンラインコミュニティ『DIALogue』を運営おります。
        </Content>
        <Row type="flex" justify="space-around"  style={{ padding: '10px', backgroundColor: '#f7f3ec' }}>
          <Col span={8}><Cards /></Col>
          <Col span={8}><Cards /></Col>
          <Col span={8}><Cards /></Col>
        </Row>
    </Layout>
    </>
  );
}

export default App;
